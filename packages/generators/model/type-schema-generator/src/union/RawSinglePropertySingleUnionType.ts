import { SingleUnionTypeProperty } from "@fern-fern/ir-model/types";
import { getTextOfTsNode, Zurg } from "@fern-typescript/commons";
import { GeneratedType, WithTypeSchemaContextMixin } from "@fern-typescript/contexts";
import { AbstractRawSingleUnionType } from "@fern-typescript/union-schema-generator";
import { OptionalKind, PropertySignatureStructure, ts } from "ts-morph";

export declare namespace RawSinglePropertySingleUnionType {
    export interface Init<Context> extends AbstractRawSingleUnionType.Init {
        singleProperty: SingleUnionTypeProperty;
        getGeneratedType: () => GeneratedType<Context>;
    }
}

export class RawSinglePropertySingleUnionType<
    Context extends WithTypeSchemaContextMixin
> extends AbstractRawSingleUnionType<Context> {
    private singleProperty: SingleUnionTypeProperty;
    private getGeneratedType: () => GeneratedType<Context>;

    constructor({ singleProperty, getGeneratedType, ...superInit }: RawSinglePropertySingleUnionType.Init<Context>) {
        super(superInit);
        this.singleProperty = singleProperty;
        this.getGeneratedType = getGeneratedType;
    }

    protected getExtends(): ts.TypeNode[] {
        return [];
    }

    protected getNonDiscriminantPropertiesForInterface(context: Context): OptionalKind<PropertySignatureStructure>[] {
        const type = context.typeSchema.getReferenceToRawType(this.singleProperty.type);
        return [
            {
                name: `"${this.singleProperty.name.wireValue}"`,
                type: getTextOfTsNode(type.typeNodeWithoutUndefined),
                hasQuestionToken: type.isOptional,
            },
        ];
    }

    protected getNonDiscriminantPropertiesForSchema(
        context: Context
    ): Zurg.union.SingleUnionType["nonDiscriminantProperties"] {
        const unionBeingGenerated = this.getGeneratedType();
        if (unionBeingGenerated.type !== "union") {
            throw new Error("Type is not a union");
        }
        return {
            isInline: true,
            properties: [
                {
                    key: {
                        parsed: unionBeingGenerated.getSinglePropertyKey(this.singleProperty),
                        raw: this.singleProperty.name.wireValue,
                    },
                    value: context.typeSchema.getSchemaOfTypeReference(this.singleProperty.type),
                },
            ],
        };
    }
}
