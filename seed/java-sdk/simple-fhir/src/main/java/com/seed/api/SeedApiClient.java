/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.api;

import com.seed.api.core.ClientOptions;
import com.seed.api.core.RequestOptions;
import com.seed.api.types.Account;

public class SeedApiClient {
    protected final ClientOptions clientOptions;

    private final RawSeedApiClient rawClient;

    public SeedApiClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
        this.rawClient = new RawSeedApiClient(clientOptions);
    }

    /**
     * Get responses with HTTP metadata like headers
     */
    public RawSeedApiClient withRawResponse() {
        return this.rawClient;
    }

    public Account getAccount(String accountId) {
        return this.rawClient.getAccount(accountId).body();
    }

    public Account getAccount(String accountId, RequestOptions requestOptions) {
        return this.rawClient.getAccount(accountId, requestOptions).body();
    }

    public static SeedApiClientBuilder builder() {
        return new SeedApiClientBuilder();
    }
}
