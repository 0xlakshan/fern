/**
 * This file was auto-generated by Fern from our API Definition.
 */

package com.seed.trace.model.submission;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.trace.core.ObjectMappers;
import java.lang.Object;
import java.lang.String;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = InternalError.Builder.class
)
public final class InternalError {
  private final ExceptionInfo exceptionInfo;

  private InternalError(ExceptionInfo exceptionInfo) {
    this.exceptionInfo = exceptionInfo;
  }

  @JsonProperty("exceptionInfo")
  public ExceptionInfo getExceptionInfo() {
    return exceptionInfo;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof InternalError && equalTo((InternalError) other);
  }

  private boolean equalTo(InternalError other) {
    return exceptionInfo.equals(other.exceptionInfo);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.exceptionInfo);
  }

  @java.lang.Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static ExceptionInfoStage builder() {
    return new Builder();
  }

  public interface ExceptionInfoStage {
    _FinalStage exceptionInfo(ExceptionInfo exceptionInfo);

    Builder from(InternalError other);
  }

  public interface _FinalStage {
    InternalError build();
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder implements ExceptionInfoStage, _FinalStage {
    private ExceptionInfo exceptionInfo;

    private Builder() {
    }

    @java.lang.Override
    public Builder from(InternalError other) {
      exceptionInfo(other.getExceptionInfo());
      return this;
    }

    @java.lang.Override
    @JsonSetter("exceptionInfo")
    public _FinalStage exceptionInfo(ExceptionInfo exceptionInfo) {
      this.exceptionInfo = Objects.requireNonNull(exceptionInfo, "exceptionInfo must not be null");
      return this;
    }

    @java.lang.Override
    public InternalError build() {
      return new InternalError(exceptionInfo);
    }
  }
}
