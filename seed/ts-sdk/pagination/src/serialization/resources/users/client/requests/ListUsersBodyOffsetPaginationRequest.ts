/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as SeedPagination from "../../../../../api/index";
import * as core from "../../../../../core";
import { WithPage } from "../../types/WithPage";

export const ListUsersBodyOffsetPaginationRequest: core.serialization.Schema<
    serializers.ListUsersBodyOffsetPaginationRequest.Raw,
    SeedPagination.ListUsersBodyOffsetPaginationRequest
> = core.serialization.object({
    pagination: WithPage.optional(),
});

export declare namespace ListUsersBodyOffsetPaginationRequest {
    export interface Raw {
        pagination?: WithPage.Raw | null;
    }
}
