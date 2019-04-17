import { client, ErrorResponse, remapFields } from "./index"

export interface ImageSummary {
  name: string
  tag: string
  namespaceId: string
  lastPush: Date
}

const toImageSummary = (data: object): ImageSummary =>
  remapFields(data, {
    namespace_id: "namespaceId",
    last_push: "lastPush",
  })

export interface ListImageResponse {
  images: ImageSummary[]
}

export const getImages = (): Promise<ListImageResponse | ErrorResponse> =>
  client.get("/v1/images").then((res) => {
    if (res.status !== 200) {
      return res.data
    }
    return { images: res.data.images.map((data: object) => toImageSummary(data)) }
  })
