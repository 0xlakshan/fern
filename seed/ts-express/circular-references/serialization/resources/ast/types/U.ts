/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedApi from "../../../../api/index";
import * as core from "../../../../core";

export const U: core.serialization.ObjectSchema<serializers.U.Raw, SeedApi.U> = core.serialization.object({
    child: core.serialization.lazyObject(() => serializers.T),
});

export declare namespace U {
    export interface Raw {
        child: serializers.T.Raw;
    }
}
