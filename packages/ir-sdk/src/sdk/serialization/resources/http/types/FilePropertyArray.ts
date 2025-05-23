/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernIr from "../../../../api/index";
import * as core from "../../../../core";
import { NameAndWireValue } from "../../commons/types/NameAndWireValue";
import { WithDocs } from "../../commons/types/WithDocs";

export const FilePropertyArray: core.serialization.ObjectSchema<
    serializers.FilePropertyArray.Raw,
    FernIr.FilePropertyArray
> = core.serialization
    .objectWithoutOptionalProperties({
        key: NameAndWireValue,
        isOptional: core.serialization.boolean(),
        contentType: core.serialization.string().optional(),
    })
    .extend(WithDocs);

export declare namespace FilePropertyArray {
    export interface Raw extends WithDocs.Raw {
        key: NameAndWireValue.Raw;
        isOptional: boolean;
        contentType?: string | null;
    }
}
