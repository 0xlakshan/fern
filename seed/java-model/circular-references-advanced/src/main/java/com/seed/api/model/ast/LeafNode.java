/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.api.model.ast;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.api.core.ObjectMappers;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = LeafNode.Builder.class)
public final class LeafNode {
    private LeafNode() {}

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof LeafNode;
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
        private Builder() {}

        public Builder from(LeafNode other) {
            return this;
        }

        public LeafNode build() {
            return new LeafNode();
        }
    }
}
