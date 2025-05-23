/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernDocsConfig from "../../../../api/index";
import * as core from "../../../../core";
import { BackgroundImageThemedConfig } from "./BackgroundImageThemedConfig";

export const BackgroundImageConfiguration: core.serialization.Schema<
    serializers.BackgroundImageConfiguration.Raw,
    FernDocsConfig.BackgroundImageConfiguration
> = core.serialization.undiscriminatedUnion([core.serialization.string(), BackgroundImageThemedConfig]);

export declare namespace BackgroundImageConfiguration {
    export type Raw = string | BackgroundImageThemedConfig.Raw;
}
