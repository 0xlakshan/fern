import { Name } from "@fern-fern/ir-model/commons";
import { ImportsManager, PackageId, Reference } from "@fern-typescript/commons";
import { GeneratedSdkEndpointTypeSchemas, SdkEndpointTypeSchemasContextMixin } from "@fern-typescript/contexts";
import { PackageResolver } from "@fern-typescript/resolvers";
import { SdkEndpointTypeSchemasGenerator } from "@fern-typescript/sdk-endpoint-type-schemas-generator";
import { SourceFile } from "ts-morph";
import { EndpointDeclarationReferencer } from "../../declaration-referencers/EndpointDeclarationReferencer";
import { getSchemaImportStrategy } from "../getSchemaImportStrategy";

export declare namespace SdkEndpointTypeSchemasContextMixinImpl {
    export interface Init {
        sdkEndpointTypeSchemasGenerator: SdkEndpointTypeSchemasGenerator;
        sdkEndpointSchemaDeclarationReferencer: EndpointDeclarationReferencer;
        packageResolver: PackageResolver;
        sourceFile: SourceFile;
        importsManager: ImportsManager;
    }
}

export class SdkEndpointTypeSchemasContextMixinImpl implements SdkEndpointTypeSchemasContextMixin {
    private sdkEndpointTypeSchemasGenerator: SdkEndpointTypeSchemasGenerator;
    private packageResolver: PackageResolver;
    private sdkEndpointSchemaDeclarationReferencer: EndpointDeclarationReferencer;
    private sourceFile: SourceFile;
    private importsManager: ImportsManager;

    constructor({
        sourceFile,
        importsManager,
        sdkEndpointTypeSchemasGenerator,
        sdkEndpointSchemaDeclarationReferencer,
        packageResolver,
    }: SdkEndpointTypeSchemasContextMixinImpl.Init) {
        this.sourceFile = sourceFile;
        this.importsManager = importsManager;
        this.packageResolver = packageResolver;
        this.sdkEndpointTypeSchemasGenerator = sdkEndpointTypeSchemasGenerator;
        this.sdkEndpointSchemaDeclarationReferencer = sdkEndpointSchemaDeclarationReferencer;
    }

    public getGeneratedEndpointTypeSchemas(packageId: PackageId, endpointName: Name): GeneratedSdkEndpointTypeSchemas {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        return this.sdkEndpointTypeSchemasGenerator.generateEndpointTypeSchemas({
            packageId,
            service: serviceDeclaration,
            endpoint,
        });
    }

    public getReferenceToEndpointTypeSchemaExport(
        packageId: PackageId,
        endpointName: Name,
        export_: string | string[]
    ): Reference {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        return this.sdkEndpointSchemaDeclarationReferencer.getReferenceToEndpointExport({
            name: { packageId, endpoint },
            referencedIn: this.sourceFile,
            importsManager: this.importsManager,
            importStrategy: getSchemaImportStrategy({ useDynamicImport: false }),
            subImport: typeof export_ === "string" ? [export_] : export_,
        });
    }
}
