import { AbsoluteFilePath, join, RelativeFilePath } from "@fern-api/fs-utils";
import { Logger } from "@fern-api/logger";
import { createLoggingExecutable } from "@fern-api/logging-execa";
import decompress from "decompress";
import { cp, readdir, rm } from "fs/promises";
import { basename } from "path";
import tmp from "tmp-promise";
import urlJoin from "url-join";
import { PublishInfo } from "../NpmPackage";

export declare namespace PersistedTypescriptProject {
    export interface Init {
        directory: AbsoluteFilePath;
        srcDirectory: RelativeFilePath;
        distDirectory: RelativeFilePath;
        yarnBuildCommand: string[];
        yarnFormatCommand: string[];
    }
}

export class PersistedTypescriptProject {
    private directory: AbsoluteFilePath;
    private srcDirectory: RelativeFilePath;
    private distDirectory: RelativeFilePath;
    private yarnBuildCommand: string[];
    private yarnFormatCommand: string[];

    private hasInstalled = false;
    private hasFormatted = false;
    private hasBuilt = false;

    constructor({
        directory,
        srcDirectory,
        distDirectory,
        yarnBuildCommand,
        yarnFormatCommand,
    }: PersistedTypescriptProject.Init) {
        this.directory = directory;
        this.srcDirectory = srcDirectory;
        this.distDirectory = distDirectory;
        this.yarnBuildCommand = yarnBuildCommand;
        this.yarnFormatCommand = yarnFormatCommand;
    }

    public getSrcDirectory(): AbsoluteFilePath {
        return join(this.directory, this.srcDirectory);
    }

    public async installDependencies(logger: Logger): Promise<void> {
        if (this.hasInstalled) {
            return;
        }

        const yarn = createLoggingExecutable("yarn", {
            cwd: this.directory,
            logger,
        });

        await yarn(["install"], {
            env: {
                // set enableImmutableInstalls=false so we can modify yarn.lock, even when in CI
                YARN_ENABLE_IMMUTABLE_INSTALLS: "false",
            },
        });

        this.hasInstalled = true;
    }

    public async format(logger: Logger): Promise<void> {
        if (this.hasFormatted) {
            return;
        }

        if (!this.hasInstalled) {
            await this.installDependencies(logger);
        }

        const yarn = createLoggingExecutable("yarn", {
            cwd: this.directory,
            logger,
        });
        await yarn(this.yarnFormatCommand);

        this.hasFormatted = true;
    }

    public async build(logger: Logger): Promise<void> {
        if (this.hasBuilt) {
            return;
        }

        if (!this.hasFormatted) {
            await this.format(logger);
        }

        const yarn = createLoggingExecutable("yarn", {
            cwd: this.directory,
            logger,
        });
        await yarn(this.yarnBuildCommand);

        this.hasBuilt = true;
    }

    public async copyProjectAsZipTo({
        destinationZip,
        logger,
    }: {
        destinationZip: AbsoluteFilePath;
        logger: Logger;
    }): Promise<void> {
        await this.zipDirectory(this.directory, { logger, destinationZip });
    }

    public async npmPackAsZipTo({
        destinationZip,
        logger,
    }: {
        destinationZip: AbsoluteFilePath;
        logger: Logger;
    }): Promise<void> {
        if (!this.hasBuilt) {
            await this.build(logger);
        }

        const npm = createLoggingExecutable("npm", {
            cwd: this.directory,
            logger,
        });

        // pack to tmp dir
        const directoryContainingPack = AbsoluteFilePath.of((await tmp.dir()).path);
        await npm(["pack", "--pack-destination", directoryContainingPack]);

        // decompress pack to a new tmp dir
        const directoryContainingPackItems = await readdir(directoryContainingPack);
        const packName = directoryContainingPackItems.find((item) => item.endsWith(".tgz"));
        if (packName == null) {
            throw new Error("Failed to find pack");
        }
        const pathToPack = join(directoryContainingPack, RelativeFilePath.of(packName));
        const directoryOfDecompressedPack = AbsoluteFilePath.of((await tmp.dir()).path);
        await decompress(pathToPack, directoryOfDecompressedPack, {
            strip: 1,
        });

        // zip decompressed pack into destination
        await this.zipDirectory(directoryOfDecompressedPack, { logger, destinationZip });
    }

    public async copyDistAsZipTo({
        destinationZip,
        logger,
    }: {
        destinationZip: AbsoluteFilePath;
        logger: Logger;
    }): Promise<void> {
        if (!this.hasBuilt) {
            await this.build(logger);
        }
        await this.zipDirectory(join(this.directory, this.distDirectory), { logger, destinationZip });
    }

    private async zipDirectory(
        directoryToZip: AbsoluteFilePath,
        { destinationZip, logger }: { destinationZip: AbsoluteFilePath; logger: Logger }
    ) {
        // make a copy of directoryToZip as the name "output", so when you unzip
        // you see a folder called "output"
        const copiedSourceParent = AbsoluteFilePath.of((await tmp.dir()).path);
        const copiedSource = join(copiedSourceParent, "output");
        await cp(directoryToZip, copiedSource, { recursive: true });

        const zip = createLoggingExecutable("zip", {
            cwd: copiedSourceParent,
            logger,
            // zip is noisy
            doNotPipeOutput: true,
        });

        const tmpZipLocation = join(AbsoluteFilePath.of((await tmp.dir()).path), "output.zip");
        await zip(["-r", tmpZipLocation, basename(copiedSource)]);
        await cp(tmpZipLocation, destinationZip);
    }

    public async publish({
        logger,
        publishInfo,
        dryRun,
    }: {
        logger: Logger;
        publishInfo: PublishInfo;
        dryRun: boolean;
    }): Promise<void> {
        if (!this.hasBuilt) {
            await this.build(logger);
        }

        const npm = createLoggingExecutable("npm", {
            cwd: this.directory,
            logger,
        });

        const parsedRegistryUrl = new URL(publishInfo.registryUrl);
        const registryUrlWithoutProtocol = urlJoin(parsedRegistryUrl.hostname, parsedRegistryUrl.pathname);

        // intentionally not writing these to the project config with `--location project`,
        // so the registry url and token aren't persisted
        await npm(["config", "set", "registry", publishInfo.registryUrl], {
            secrets: [publishInfo.registryUrl],
        });
        await npm(["config", "set", `//${registryUrlWithoutProtocol}:_authToken`, publishInfo.token], {
            secrets: [registryUrlWithoutProtocol, publishInfo.token],
        });

        const publishCommand = ["publish"];
        if (dryRun) {
            publishCommand.push("--dry-run");
        }
        await npm(publishCommand);
    }

    public async deleteGitIgnoredFiles(logger: Logger): Promise<void> {
        const git = createLoggingExecutable("git", {
            cwd: this.directory,
            logger,
        });
        await git(["init"]);
        await git(["add", "."]);
        await git(["commit", "-m", '"Initial commit"']);
        await git(["clean", "-fdx"]);

        await rm(join(this.directory, ".git"), { recursive: true });
    }

    public async writeArbitraryFiles(run: (pathToProject: AbsoluteFilePath) => Promise<void>): Promise<void> {
        await run(this.directory);
    }
}
