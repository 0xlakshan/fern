/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const StdoutResponse: core.serialization.ObjectSchema<serializers.StdoutResponse.Raw, SeedTrace.StdoutResponse> =
    core.serialization.object({
        submissionId: core.serialization.lazy(() => serializers.SubmissionId),
        stdout: core.serialization.string(),
    });

export declare namespace StdoutResponse {
    export interface Raw {
        submissionId: serializers.SubmissionId.Raw;
        stdout: string;
    }
}
