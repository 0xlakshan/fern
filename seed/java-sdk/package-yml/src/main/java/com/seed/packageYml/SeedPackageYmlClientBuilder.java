/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.packageYml;

import com.seed.packageYml.core.ClientOptions;
import com.seed.packageYml.core.Environment;
import okhttp3.OkHttpClient;

public final class SeedPackageYmlClientBuilder {
    private ClientOptions.Builder clientOptionsBuilder = ClientOptions.builder();

    private Environment environment;

    public SeedPackageYmlClientBuilder url(String url) {
        this.environment = Environment.custom(url);
        return this;
    }

    /**
     * Sets the timeout (in seconds) for the client. Defaults to 60 seconds.
     */
    public SeedPackageYmlClientBuilder timeout(int timeout) {
        this.clientOptionsBuilder.timeout(timeout);
        return this;
    }

    /**
     * Sets the maximum number of retries for the client. Defaults to 2 retries.
     */
    public SeedPackageYmlClientBuilder maxRetries(int maxRetries) {
        this.clientOptionsBuilder.maxRetries(maxRetries);
        return this;
    }

    /**
     * Sets the underlying OkHttp client
     */
    public SeedPackageYmlClientBuilder httpClient(OkHttpClient httpClient) {
        this.clientOptionsBuilder.httpClient(httpClient);
        return this;
    }

    public SeedPackageYmlClient build() {
        clientOptionsBuilder.environment(this.environment);
        return new SeedPackageYmlClient(clientOptionsBuilder.build());
    }
}
