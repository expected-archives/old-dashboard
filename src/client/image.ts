import { ApiResponse, client, remapFields } from "./index"

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

export const getImages = (): Promise<ApiResponse<ImageSummary[]>> =>
  client.get("/v1/images").then((res) => {
    if (res.status !== 200) {
      return { status: res.status, error: res.data }
    }
    return { status: res.status, data: res.data.images.map((data: object) => toImageSummary(data)) }
  })
