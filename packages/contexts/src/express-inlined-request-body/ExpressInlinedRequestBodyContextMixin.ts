import { Name } from "@fern-fern/ir-model/commons";
import { PackageId, Reference } from "@fern-typescript/commons";
import { GeneratedExpressInlinedRequestBody } from "./GeneratedExpressInlinedRequestBody";

export interface ExpressInlinedRequestBodyContextMixin {
    getGeneratedInlinedRequestBody: (packageId: PackageId, endpointName: Name) => GeneratedExpressInlinedRequestBody;
    getReferenceToInlinedRequestBodyType: (packageId: PackageId, endpointName: Name) => Reference;
}

export interface WithExpressInlinedRequestBodyContextMixin {
    expressInlinedRequestBody: ExpressInlinedRequestBodyContextMixin;
}
