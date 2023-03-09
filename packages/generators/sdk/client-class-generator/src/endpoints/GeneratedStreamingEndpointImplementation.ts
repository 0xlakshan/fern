import { assertNever } from "@fern-api/core-utils";
import {
    HttpEndpoint,
    HttpPath,
    HttpRequestBody,
    HttpService,
    PathParameter,
    SdkRequestShape,
    StreamingResponse,
} from "@fern-fern/ir-model/http";
import { Fetcher, getTextOfTsNode, PackageId, StreamingFetcher } from "@fern-typescript/commons";
import { SdkClientClassContext } from "@fern-typescript/contexts";
import { OptionalKind, ParameterDeclarationStructure, ts } from "ts-morph";
import urlJoin from "url-join";
import { GeneratedHeader } from "../GeneratedHeader";
import { GeneratedSdkClientClassImpl } from "../GeneratedSdkClientClassImpl";
import { RequestBodyParameter } from "../request-parameter/RequestBodyParameter";
import { RequestParameter } from "../request-parameter/RequestParameter";
import { RequestWrapperParameter } from "../request-parameter/RequestWrapperParameter";
import { EndpointSignature, GeneratedEndpointImplementation } from "./GeneratedEndpointImplementation";

export declare namespace GeneratedStreamingEndpointImplementation {
    export interface Init {
        packageId: PackageId;
        service: HttpService;
        endpoint: HttpEndpoint;
        requestBody: HttpRequestBody.InlinedRequestBody | HttpRequestBody.Reference | undefined;
        response: StreamingResponse;
        generatedSdkClientClass: GeneratedSdkClientClassImpl;
        includeCredentialsOnCrossOriginRequests: boolean;
    }
}

export class GeneratedStreamingEndpointImplementation implements GeneratedEndpointImplementation {
    private static QUERY_PARAMS_VARIABLE_NAME = "_queryParams";
    private static CB_CALLBACK_NAME = "cb";
    private static DATA_PARAMETER_NAME = "data";
    private static OPTS_PARAMETER_NAME = "opts";

    public readonly endpoint: HttpEndpoint;
    private packageId: PackageId;
    private service: HttpService;
    private response: StreamingResponse;
    private generatedSdkClientClass: GeneratedSdkClientClassImpl;
    private requestParameter: RequestParameter | undefined;
    private requestBody: HttpRequestBody.InlinedRequestBody | HttpRequestBody.Reference | undefined;
    private includeCredentialsOnCrossOriginRequests: boolean;

    constructor({
        packageId,
        service,
        endpoint,
        requestBody,
        generatedSdkClientClass,
        includeCredentialsOnCrossOriginRequests,
        response,
    }: GeneratedStreamingEndpointImplementation.Init) {
        this.packageId = packageId;
        this.service = service;
        this.endpoint = endpoint;
        this.generatedSdkClientClass = generatedSdkClientClass;
        this.includeCredentialsOnCrossOriginRequests = includeCredentialsOnCrossOriginRequests;
        this.requestBody = requestBody;
        this.response = response;

        const sdkRequest = this.endpoint.sdkRequest;
        this.requestParameter =
            sdkRequest != null
                ? SdkRequestShape._visit<RequestParameter>(sdkRequest.shape, {
                      justRequestBody: (requestBodyReference) =>
                          new RequestBodyParameter({ packageId, requestBodyReference, service, endpoint, sdkRequest }),
                      wrapper: () => new RequestWrapperParameter({ packageId, service, endpoint, sdkRequest }),
                      _unknown: () => {
                          throw new Error("Unknown SdkRequest: " + this.endpoint.sdkRequest?.shape.type);
                      },
                  })
                : undefined;
    }

    public getOverloads(): EndpointSignature[] {
        return [];
    }

    public getSignature(
        context: SdkClientClassContext,
        {
            requestParameterIntersection,
            excludeInitializers = false,
        }: { requestParameterIntersection?: ts.TypeNode; excludeInitializers?: boolean } = {}
    ): EndpointSignature {
        return {
            parameters: this.getEndpointParameters(context, { requestParameterIntersection, excludeInitializers }),
            returnTypeWithoutPromise: ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
        };
    }

    public getDocs(context: SdkClientClassContext): string | undefined {
        const lines: string[] = [];
        if (this.endpoint.docs != null) {
            lines.push(this.endpoint.docs);
        }

        for (const error of this.endpoint.errors) {
            const referenceToError = context.sdkError
                .getReferenceToError(error.error)
                .getExpression({ isForComment: true });
            lines.push(`@throws {${getTextOfTsNode(referenceToError)}}`);
        }

        if (lines.length === 0) {
            return undefined;
        }

        return lines.join("\n");
    }

    private getEndpointParameters(
        context: SdkClientClassContext,
        {
            requestParameterIntersection,
            excludeInitializers,
        }: { requestParameterIntersection: ts.TypeNode | undefined; excludeInitializers: boolean }
    ): OptionalKind<ParameterDeclarationStructure>[] {
        const parameters: OptionalKind<ParameterDeclarationStructure>[] = [];
        for (const pathParameter of this.getAllPathParameters()) {
            parameters.push({
                name: this.getParameterNameForPathParameter(pathParameter),
                type: getTextOfTsNode(context.type.getReferenceToType(pathParameter.valueType).typeNode),
            });
        }
        if (this.requestParameter != null) {
            parameters.push(
                this.requestParameter.getParameterDeclaration(context, {
                    typeIntersection: requestParameterIntersection,
                    excludeInitializers,
                })
            );
        }
        parameters.push(
            {
                name: GeneratedStreamingEndpointImplementation.CB_CALLBACK_NAME,
                type: getTextOfTsNode(
                    ts.factory.createFunctionTypeNode(
                        undefined,
                        [
                            ts.factory.createParameterDeclaration(
                                undefined,
                                undefined,
                                undefined,
                                GeneratedStreamingEndpointImplementation.DATA_PARAMETER_NAME,
                                undefined,
                                context.type.getReferenceToType(this.response.dataEventType).typeNode
                            ),
                        ],
                        ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
                    )
                ),
            },
            {
                name: GeneratedStreamingEndpointImplementation.OPTS_PARAMETER_NAME,
                hasQuestionToken: true,
                type: getTextOfTsNode(
                    ts.factory.createExpressionWithTypeArguments(ts.factory.createIdentifier("Pick"), [
                        context.base.coreUtilities.streamingFetcher.StreamingFetcher.Args._getReferenceToType(),
                        ts.factory.createUnionTypeNode([
                            ts.factory.createLiteralTypeNode(
                                ts.factory.createStringLiteral(
                                    context.base.coreUtilities.streamingFetcher.StreamingFetcher.Args.properties.onError
                                )
                            ),
                            ts.factory.createLiteralTypeNode(
                                ts.factory.createStringLiteral(
                                    context.base.coreUtilities.streamingFetcher.StreamingFetcher.Args.properties
                                        .onFinish
                                )
                            ),
                            ts.factory.createLiteralTypeNode(
                                ts.factory.createStringLiteral(
                                    context.base.coreUtilities.streamingFetcher.StreamingFetcher.Args.properties
                                        .abortController
                                )
                            ),
                            ts.factory.createLiteralTypeNode(
                                ts.factory.createStringLiteral(
                                    context.base.coreUtilities.streamingFetcher.StreamingFetcher.Args.properties
                                        .timeoutMs
                                )
                            ),
                        ]),
                    ])
                ),
            }
        );
        return parameters;
    }

    private getAllPathParameters(): PathParameter[] {
        return [...this.service.pathParameters, ...this.endpoint.pathParameters];
    }

    private getParameterNameForPathParameter(pathParameter: PathParameter): string {
        return pathParameter.name.camelCase.unsafeName;
    }

    public getStatements(context: SdkClientClassContext): ts.Statement[] {
        return [...this.getRequestBuilderStatements(context), ...this.invokeFetcher(context)];
    }

    public getRequestBuilderStatements(context: SdkClientClassContext): ts.Statement[] {
        const statements: ts.Statement[] = [];

        if (this.requestParameter != null) {
            statements.push(...this.requestParameter.getInitialStatements(context));
            const queryParameters = this.requestParameter.getAllQueryParameters(context);
            if (queryParameters.length > 0) {
                statements.push(
                    ts.factory.createVariableStatement(
                        undefined,
                        ts.factory.createVariableDeclarationList(
                            [
                                ts.factory.createVariableDeclaration(
                                    GeneratedStreamingEndpointImplementation.QUERY_PARAMS_VARIABLE_NAME,
                                    undefined,
                                    undefined,
                                    ts.factory.createNewExpression(
                                        ts.factory.createIdentifier("URLSearchParams"),
                                        undefined,
                                        []
                                    )
                                ),
                            ],
                            ts.NodeFlags.Const
                        )
                    )
                );
                for (const queryParameter of queryParameters) {
                    statements.push(
                        ...this.requestParameter.withQueryParameter(
                            queryParameter,
                            context,
                            (referenceToQueryParameter) => {
                                return [
                                    ts.factory.createExpressionStatement(
                                        ts.factory.createCallExpression(
                                            ts.factory.createPropertyAccessExpression(
                                                ts.factory.createIdentifier(
                                                    GeneratedStreamingEndpointImplementation.QUERY_PARAMS_VARIABLE_NAME
                                                ),
                                                ts.factory.createIdentifier("append")
                                            ),
                                            undefined,
                                            [
                                                ts.factory.createStringLiteral(queryParameter.name.wireValue),
                                                context.type.stringify(
                                                    referenceToQueryParameter,
                                                    queryParameter.valueType
                                                ),
                                            ]
                                        )
                                    ),
                                ];
                            }
                        )
                    );
                }
            }
        }

        return statements;
    }

    private getReferenceToEnvironment(context: SdkClientClassContext): ts.Expression {
        const referenceToEnvironment = this.generatedSdkClientClass.getEnvironment(context);
        const url = this.buildUrl(context);
        if (url != null) {
            return context.base.externalDependencies.urlJoin.invoke([referenceToEnvironment, url]);
        } else {
            return referenceToEnvironment;
        }
    }

    private buildUrl(context: SdkClientClassContext): ts.Expression | undefined {
        if (this.service.pathParameters.length === 0 && this.endpoint.pathParameters.length === 0) {
            const joinedUrl = urlJoin(this.service.basePath.head, this.endpoint.path.head);
            if (joinedUrl.length === 0) {
                return undefined;
            }
            return ts.factory.createStringLiteral(joinedUrl);
        }

        const httpPath = this.getHttpPath();

        return ts.factory.createTemplateExpression(
            ts.factory.createTemplateHead(httpPath.head),
            httpPath.parts.map((part, index) => {
                const pathParameter = this.getAllPathParameters().find(
                    (param) => param.name.originalName === part.pathParameter
                );
                if (pathParameter == null) {
                    throw new Error("Could not locate path parameter: " + part.pathParameter);
                }

                let referenceToPathParameterValue: ts.Expression = ts.factory.createIdentifier(
                    this.getParameterNameForPathParameter(pathParameter)
                );
                if (pathParameter.valueType._type === "named") {
                    referenceToPathParameterValue = context.typeSchema
                        .getSchemaOfNamedType(pathParameter.valueType, {
                            isGeneratingSchema: false,
                        })
                        .jsonOrThrow(referenceToPathParameterValue, {
                            unrecognizedObjectKeys: "fail",
                            allowUnrecognizedEnumValues: false,
                            allowUnrecognizedUnionMembers: false,
                        });
                }

                return ts.factory.createTemplateSpan(
                    referenceToPathParameterValue,
                    index === httpPath.parts.length - 1
                        ? ts.factory.createTemplateTail(part.tail)
                        : ts.factory.createTemplateMiddle(part.tail)
                );
            })
        );
    }

    private getHttpPath(): HttpPath {
        const serviceBasePathPartsExceptLast = [...this.service.basePath.parts];
        const lastServiceBasePathPart = serviceBasePathPartsExceptLast.pop();

        if (lastServiceBasePathPart == null) {
            return {
                head: urlJoin(this.service.basePath.head, this.endpoint.path.head),
                parts: this.endpoint.path.parts,
            };
        }

        return {
            head: this.service.basePath.head,
            parts: [
                ...serviceBasePathPartsExceptLast,
                {
                    pathParameter: lastServiceBasePathPart.pathParameter,
                    tail:
                        lastServiceBasePathPart.tail.length > 0
                            ? urlJoin(lastServiceBasePathPart.tail, this.endpoint.path.head)
                            : this.endpoint.path.head,
                },
                ...this.endpoint.path.parts,
            ],
        };
    }

    private getHeaders(context: SdkClientClassContext): ts.ObjectLiteralElementLike[] {
        const elements: GeneratedHeader[] = [];

        const authorizationHederValue = this.generatedSdkClientClass.getAuthorizationHeaderValue();
        if (authorizationHederValue != null) {
            elements.push({
                header: "Authorization",
                value: authorizationHederValue,
            });
        }

        elements.push(...this.generatedSdkClientClass.getApiHeaders(context));

        if (this.requestParameter != null) {
            for (const header of this.requestParameter.getAllHeaders(context)) {
                elements.push({
                    header: header.name.wireValue,
                    value: this.requestParameter.getReferenceToHeader(header, context),
                });
            }
        }

        return elements.map(({ header, value }) =>
            ts.factory.createPropertyAssignment(ts.factory.createStringLiteral(header), value)
        );
    }

    private getSerializedRequestBody(context: SdkClientClassContext): ts.Expression | undefined {
        if (this.requestParameter == null || this.requestBody == null) {
            return undefined;
        }
        const referenceToRequestBody = this.getReferenceToRequestBody(context);
        if (referenceToRequestBody == null) {
            return undefined;
        }

        switch (this.requestBody.type) {
            case "inlinedRequestBody":
                return context.sdkInlinedRequestBodySchema
                    .getGeneratedInlinedRequestBodySchema(this.packageId, this.endpoint.name)
                    .serializeRequest(referenceToRequestBody, context);
            case "reference":
                return context.sdkEndpointTypeSchemas
                    .getGeneratedEndpointTypeSchemas(this.packageId, this.endpoint.name)
                    .serializeRequest(referenceToRequestBody, context);
            default:
                assertNever(this.requestBody);
        }
    }

    public invokeFetcher(context: SdkClientClassContext): ts.Statement[] {
        const PARSED_DATA_VARIABLE_NAME = "parsed";

        const fetcherArgs: Fetcher.Args = {
            url: this.getReferenceToEnvironment(context),
            method: ts.factory.createStringLiteral(this.endpoint.method),
            headers: this.getHeaders(context),
            queryParameters:
                this.endpoint.queryParameters.length > 0
                    ? ts.factory.createIdentifier(GeneratedStreamingEndpointImplementation.QUERY_PARAMS_VARIABLE_NAME)
                    : undefined,
            body: this.getSerializedRequestBody(context),
            timeoutMs: undefined,
            withCredentials: this.includeCredentialsOnCrossOriginRequests,
            contentType: "application/json",
        };

        return [
            ts.factory.createExpressionStatement(
                context.base.coreUtilities.streamingFetcher.streamingFetcher._invoke(
                    {
                        ...fetcherArgs,
                        onData: ts.factory.createArrowFunction(
                            [ts.factory.createToken(ts.SyntaxKind.AsyncKeyword)],
                            undefined,
                            [
                                ts.factory.createParameterDeclaration(
                                    undefined,
                                    undefined,
                                    undefined,
                                    GeneratedStreamingEndpointImplementation.DATA_PARAMETER_NAME
                                ),
                            ],
                            undefined,
                            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                            ts.factory.createBlock(
                                [
                                    ts.factory.createVariableStatement(
                                        undefined,
                                        ts.factory.createVariableDeclarationList(
                                            [
                                                ts.factory.createVariableDeclaration(
                                                    PARSED_DATA_VARIABLE_NAME,
                                                    undefined,
                                                    undefined,
                                                    context.sdkEndpointTypeSchemas
                                                        .getGeneratedEndpointTypeSchemas(
                                                            this.packageId,
                                                            this.endpoint.name
                                                        )
                                                        .deserializeStreamData(
                                                            ts.factory.createIdentifier(
                                                                GeneratedStreamingEndpointImplementation.DATA_PARAMETER_NAME
                                                            ),
                                                            context
                                                        )
                                                ),
                                            ],
                                            ts.NodeFlags.Const
                                        )
                                    ),
                                    ...context.base.coreUtilities.zurg.Schema._visitMaybeValid(
                                        ts.factory.createIdentifier(PARSED_DATA_VARIABLE_NAME),
                                        {
                                            valid: (validData) => [
                                                ts.factory.createExpressionStatement(
                                                    ts.factory.createCallChain(
                                                        ts.factory.createIdentifier(
                                                            GeneratedStreamingEndpointImplementation.CB_CALLBACK_NAME
                                                        ),
                                                        ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
                                                        undefined,
                                                        [validData]
                                                    )
                                                ),
                                            ],
                                            invalid: (errors) => [
                                                ts.factory.createExpressionStatement(
                                                    ts.factory.createCallChain(
                                                        this.getReferenceToOpt("onError"),
                                                        ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
                                                        undefined,
                                                        [errors]
                                                    )
                                                ),
                                            ],
                                        }
                                    ),
                                ],
                                true
                            )
                        ),
                        onError: this.getReferenceToOpt("onError"),
                        onFinish: this.getReferenceToOpt("onFinish"),
                        abortController: this.getReferenceToOpt("abortController"),
                        terminator:
                            this.response.terminator != null
                                ? ts.factory.createStringLiteral(this.response.terminator)
                                : undefined,
                    },
                    {
                        referenceToFetcher:
                            context.base.coreUtilities.streamingFetcher.streamingFetcher._getReferenceTo(),
                    }
                )
            ),
        ];
    }

    private getReferenceToOpt(key: keyof StreamingFetcher.Args): ts.Expression {
        return ts.factory.createPropertyAccessChain(
            ts.factory.createIdentifier(GeneratedStreamingEndpointImplementation.OPTS_PARAMETER_NAME),
            ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
            ts.factory.createIdentifier(key)
        );
    }

    public getReferenceToRequestBody(context: SdkClientClassContext): ts.Expression | undefined {
        return this.requestParameter?.getReferenceToRequestBody(context);
    }

    public getReferenceToQueryParameter(queryParameterKey: string, context: SdkClientClassContext): ts.Expression {
        if (this.requestParameter == null) {
            throw new Error("Cannot get reference to query parameter because request parameter is not defined.");
        }
        return this.requestParameter.getReferenceToQueryParameter(queryParameterKey, context);
    }
}
