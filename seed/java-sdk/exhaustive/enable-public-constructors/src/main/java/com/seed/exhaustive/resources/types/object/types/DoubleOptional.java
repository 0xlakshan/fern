/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.exhaustive.resources.types.object.types;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.exhaustive.core.ObjectMappers;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = DoubleOptional.Builder.class)
public final class DoubleOptional {
    private final Optional<String> optionalAlias;

    private final Map<String, Object> additionalProperties;

    public DoubleOptional(Optional<String> optionalAlias, Map<String, Object> additionalProperties) {
        this.optionalAlias = optionalAlias;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("optionalAlias")
    public Optional<String> getOptionalAlias() {
        return optionalAlias;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof DoubleOptional && equalTo((DoubleOptional) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(DoubleOptional other) {
        return optionalAlias.equals(other.optionalAlias);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.optionalAlias);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder {
        private Optional<String> optionalAlias = Optional.empty();

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        public Builder from(DoubleOptional other) {
            optionalAlias(other.getOptionalAlias());
            return this;
        }

        @JsonSetter(value = "optionalAlias", nulls = Nulls.SKIP)
        public Builder optionalAlias(Optional<String> optionalAlias) {
            this.optionalAlias = optionalAlias;
            return this;
        }

        public Builder optionalAlias(String optionalAlias) {
            this.optionalAlias = Optional.ofNullable(optionalAlias);
            return this;
        }

        public DoubleOptional build() {
            return new DoubleOptional(optionalAlias, additionalProperties);
        }
    }
}
