import { InlinedRequestBody, InlinedRequestBodyProperty } from "@fern-fern/ir-model/http";
import { getTextOfTsNode } from "@fern-typescript/commons";
import { ExpressInlinedRequestBodyContext, GeneratedExpressInlinedRequestBody } from "@fern-typescript/contexts";

export declare namespace GeneratedExpressInlinedRequestBodyImpl {
    export interface Init {
        requestBody: InlinedRequestBody;
        typeName: string;
    }
}

export class GeneratedExpressInlinedRequestBodyImpl implements GeneratedExpressInlinedRequestBody {
    private requestBody: InlinedRequestBody;
    private typeName: string;

    constructor({ requestBody, typeName }: GeneratedExpressInlinedRequestBodyImpl.Init) {
        this.requestBody = requestBody;
        this.typeName = typeName;
    }

    public writeToFile(context: ExpressInlinedRequestBodyContext): void {
        const requestInterface = context.base.sourceFile.addInterface({
            name: this.typeName,
            isExported: true,
        });
        for (const extension of this.requestBody.extends) {
            requestInterface.addExtends(getTextOfTsNode(context.type.getReferenceToNamedType(extension).getTypeNode()));
        }
        for (const property of this.requestBody.properties) {
            const propertyType = context.type.getReferenceToType(property.valueType);
            requestInterface.addProperty({
                name: this.getPropertyKey(property),
                type: getTextOfTsNode(propertyType.typeNodeWithoutUndefined),
                hasQuestionToken: propertyType.isOptional,
            });
        }
    }

    private getPropertyKey(property: InlinedRequestBodyProperty): string {
        return property.name.name.camelCase.unsafeName;
    }
}
