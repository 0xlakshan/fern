import { DeclaredTypeName, MapType, TypeReference } from "@fern-fern/ir-model/types";
import { Zurg } from "@fern-typescript/commons-v2";
import { AbstractTypeReferenceConverter } from "./AbstractTypeReferenceConverter";

export declare namespace TypeReferenceToSchemaConverter {
    export interface Init extends AbstractTypeReferenceConverter.Init {
        getSchemaOfNamedType: (typeName: DeclaredTypeName) => Zurg.Schema;
        zurg: Zurg;
    }
}

export class TypeReferenceToSchemaConverter extends AbstractTypeReferenceConverter<Zurg.Schema> {
    private getSchemaOfNamedType: (typeName: DeclaredTypeName) => Zurg.Schema;
    private zurg: Zurg;

    constructor({ getSchemaOfNamedType, zurg, ...superInit }: TypeReferenceToSchemaConverter.Init) {
        super(superInit);
        this.getSchemaOfNamedType = getSchemaOfNamedType;
        this.zurg = zurg;
    }

    protected override named(typeName: DeclaredTypeName): Zurg.Schema {
        return this.getSchemaOfNamedType(typeName);
    }

    protected override boolean(): Zurg.Schema {
        return this.zurg.boolean();
    }

    protected override string(): Zurg.Schema {
        return this.zurg.string();
    }

    protected override number(): Zurg.Schema {
        return this.zurg.number();
    }

    protected override dateTime(): Zurg.Schema {
        return this.zurg.date();
    }

    protected override optional(itemType: TypeReference): Zurg.Schema {
        return this.convert(itemType).optional();
    }

    protected override unknown(): Zurg.Schema {
        return this.zurg.unknown();
    }

    protected override list(itemType: TypeReference): Zurg.Schema {
        return this.zurg.list(this.convert(itemType));
    }

    protected override mapWithEnumKeys({ keyType, valueType }: MapType): Zurg.Schema {
        const valueSchema = this.convert(valueType);
        return this.zurg.record({
            keySchema: this.convert(keyType),
            valueSchema: valueSchema.isOptional ? valueSchema : valueSchema.optional(),
        });
    }

    protected override mapWithNonEnumKeys({ keyType, valueType }: MapType): Zurg.Schema {
        return this.zurg.record({
            keySchema: this.convert(keyType),
            valueSchema: this.convert(valueType),
        });
    }

    protected override set(itemType: TypeReference): Zurg.Schema {
        const itemSchema = this.convert(itemType);
        if (this.isTypeReferencePrimitive(itemType)) {
            return this.zurg.set(itemSchema);
        } else {
            return this.zurg.list(itemSchema);
        }
    }
}
