import { Name } from "@fern-fern/ir-model/commons";
import { PackageId, Reference } from "@fern-typescript/commons";
import { GeneratedEndpointErrorUnion } from "./GeneratedEndpointErrorUnion";

export interface EndpointErrorUnionContextMixin {
    getGeneratedEndpointErrorUnion: (packageId: PackageId, endpointName: Name) => GeneratedEndpointErrorUnion;
    getReferenceToEndpointTypeExport: (
        packageId: PackageId,
        endpointName: Name,
        export_: string | string[]
    ) => Reference;
}

export interface WithEndpointErrorUnionContextMixin {
    endpointErrorUnion: EndpointErrorUnionContextMixin;
}
