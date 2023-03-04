import { WithBaseContextMixin, WithTypeContextMixin } from "@fern-typescript/contexts";
import { ts } from "ts-morph";
import { AbstractParsedSingleUnionType } from "../parsed-single-union-type/AbstractParsedSingleUnionType";

export abstract class AbstractUnknownSingleUnionType<
    Context extends WithBaseContextMixin & WithTypeContextMixin
> extends AbstractParsedSingleUnionType<Context> {
    protected static INTERFACE_NAME = "_Unknown";
    protected static BUILDER_NAME = "_unknown";
    protected static VISITOR_KEY = "_other";

    public getDiscriminantValue(): string | undefined {
        return undefined;
    }

    public getDiscriminantValueType(): ts.TypeNode {
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword);
    }

    public getInterfaceName(): string {
        return AbstractUnknownSingleUnionType.INTERFACE_NAME;
    }

    public getBuilderName(): string {
        return AbstractUnknownSingleUnionType.BUILDER_NAME;
    }

    public getVisitorKey(): string {
        return AbstractUnknownSingleUnionType.VISITOR_KEY;
    }

    protected getNonVisitProperties({ context }: { context: Context }): ts.ObjectLiteralElementLike[] {
        return [...this.singleUnionType.getNonDiscriminantPropertiesForBuilder(context)];
    }
}
