/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedApi from "../../../../api/index";
import * as core from "../../../../core";

export const Acai: core.serialization.ObjectSchema<serializers.Acai.Raw, SeedApi.Acai> = core.serialization.object({
    animal: core.serialization.lazy(() => serializers.Animal),
});

export declare namespace Acai {
    export interface Raw {
        animal: serializers.Animal.Raw;
    }
}
