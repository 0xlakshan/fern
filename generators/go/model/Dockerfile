FROM golang:1.22.7-alpine3.19

WORKDIR /workspace

RUN apk add --no-cache ca-certificates git

COPY go.mod go.sum /workspace/
RUN go mod download

COPY cmd /workspace/cmd
COPY internal /workspace/internal
COPY version.go /workspace/version.go

RUN CGO_ENABLED=0 go build -ldflags "-s -w" -trimpath -buildvcs=false -o /fern-go-model ./cmd/fern-go-model

ENTRYPOINT ["/fern-go-model"]
