import { StreamingFetcher as ActualStreamingFetcher } from "@fern-typescript/streaming-fetcher";
import { ts } from "ts-morph";

export interface StreamingFetcher {
    readonly StreamingFetcher: {
        Args: {
            properties: { [Arg in keyof ActualStreamingFetcher.Args]-?: Arg };
            _getReferenceToType: () => ts.TypeNode;
        };
    };

    readonly streamingFetcher: {
        _getReferenceTo: () => ts.Expression;
        _invoke: (
            args: StreamingFetcher.Args,
            opts: {
                referenceToFetcher: ts.Expression;
            }
        ) => ts.Expression;
    };
}

export declare namespace StreamingFetcher {
    export interface Args {
        url: ts.Expression;
        method: ts.Expression;
        headers: ts.ObjectLiteralElementLike[];
        queryParameters: ts.Expression | undefined;
        body: ts.Expression | undefined;
        timeoutMs: ts.Expression | undefined;
        withCredentials: boolean;

        onData: ts.Expression;
        onError: ts.Expression | undefined;
        onFinish: ts.Expression | undefined;
        abortController: ts.Expression | undefined;
    }
}
