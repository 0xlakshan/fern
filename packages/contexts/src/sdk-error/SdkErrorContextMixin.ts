import { DeclaredErrorName, ErrorDeclaration } from "@fern-fern/ir-model/errors";
import { Reference } from "@fern-typescript/commons";
import { GeneratedSdkError } from "./GeneratedSdkError";

export interface SdkErrorContextMixin {
    getReferenceToError: (errorName: DeclaredErrorName) => Reference;
    getGeneratedSdkError: (errorName: DeclaredErrorName) => GeneratedSdkError | undefined;
    getErrorDeclaration: (errorName: DeclaredErrorName) => ErrorDeclaration;
}

export interface WithSdkErrorContextMixin {
    error: SdkErrorContextMixin;
}
