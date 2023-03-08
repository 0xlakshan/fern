import {
    DeclaredTypeName,
    ExampleTypeReference,
    ResolvedTypeReference,
    TypeReference,
} from "@fern-fern/ir-model/types";
import { ImportsManager, Reference, TypeReferenceNode } from "@fern-typescript/commons";
import { GeneratedType, GeneratedTypeReferenceExample, TypeContextMixin } from "@fern-typescript/contexts";
import { TypeResolver } from "@fern-typescript/resolvers";
import { TypeGenerator } from "@fern-typescript/type-generator";
import { TypeReferenceToParsedTypeNodeConverter } from "@fern-typescript/type-reference-converters";
import { TypeReferenceExampleGenerator } from "@fern-typescript/type-reference-example-generator";
import { SourceFile } from "ts-morph";
import { TypeDeclarationReferencer } from "../../declaration-referencers/TypeDeclarationReferencer";

export declare namespace TypeContextMixinImpl {
    export interface Init {
        sourceFile: SourceFile;
        importsManager: ImportsManager;
        typeResolver: TypeResolver;
        typeDeclarationReferencer: TypeDeclarationReferencer;
        typeGenerator: TypeGenerator;
        typeReferenceExampleGenerator: TypeReferenceExampleGenerator;
    }
}

export class TypeContextMixinImpl implements TypeContextMixin {
    private sourceFile: SourceFile;
    private importsManager: ImportsManager;
    private typeDeclarationReferencer: TypeDeclarationReferencer;
    private typeReferenceToParsedTypeNodeConverter: TypeReferenceToParsedTypeNodeConverter;
    private typeResolver: TypeResolver;
    private typeGenerator: TypeGenerator;
    private typeReferenceExampleGenerator: TypeReferenceExampleGenerator;

    constructor({
        sourceFile,
        importsManager,
        typeResolver,
        typeDeclarationReferencer,
        typeGenerator,
        typeReferenceExampleGenerator,
    }: TypeContextMixinImpl.Init) {
        this.sourceFile = sourceFile;
        this.importsManager = importsManager;
        this.typeResolver = typeResolver;
        this.typeDeclarationReferencer = typeDeclarationReferencer;
        this.typeGenerator = typeGenerator;
        this.typeReferenceExampleGenerator = typeReferenceExampleGenerator;

        this.typeReferenceToParsedTypeNodeConverter = new TypeReferenceToParsedTypeNodeConverter({
            getReferenceToNamedType: (typeName) => this.getReferenceToNamedType(typeName).getEntityName(),
            typeResolver,
        });
    }

    public getReferenceToType(typeReference: TypeReference): TypeReferenceNode {
        return this.typeReferenceToParsedTypeNodeConverter.convert(typeReference);
    }

    public getReferenceToNamedType(typeName: DeclaredTypeName): Reference {
        return this.typeDeclarationReferencer.getReferenceToType({
            name: typeName,
            importStrategy: { type: "fromRoot" },
            referencedIn: this.sourceFile,
            importsManager: this.importsManager,
        });
    }

    public resolveTypeReference(typeReference: TypeReference): ResolvedTypeReference {
        return this.typeResolver.resolveTypeReference(typeReference);
    }

    public resolveTypeName(typeName: DeclaredTypeName): ResolvedTypeReference {
        return this.typeResolver.resolveTypeName(typeName);
    }

    public getGeneratedType(typeName: DeclaredTypeName): GeneratedType {
        const typeDeclaration = this.typeResolver.getTypeDeclarationFromName(typeName);
        return this.typeGenerator.generateType({
            shape: typeDeclaration.shape,
            docs: typeDeclaration.docs ?? undefined,
            typeName: this.typeDeclarationReferencer.getExportedName(typeDeclaration.name),
            examples: typeDeclaration.examples,
            fernFilepath: typeDeclaration.name.fernFilepath,
            getReferenceToSelf: (context) => context.type.getReferenceToNamedType(typeName),
        });
    }

    public getGeneratedExample(example: ExampleTypeReference): GeneratedTypeReferenceExample {
        return this.typeReferenceExampleGenerator.generateExample(example);
    }
}
