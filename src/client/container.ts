import { ApiResponse, client, remapFields } from "./index"

export interface Container {
  id: string
  name: string
  status: string
  image: string
  endpoint: string
  memory: number
  tags: string[]
  createdAt: Date
}

const toContainer = (data: object): Container => {
  const container = remapFields(data, {
    created_at: "createdAt",
  })
  container.createdAt = new Date(container.createdAt)
  return container
}

export const getContainers = (): Promise<ApiResponse<Container[]>> =>
  client.get("/v1/containers")
    .then((res) => {
      if (res.status !== 200) {
        return { status: res.status, error: res.data }
      }
      return { status: res.status, data: res.data.containers.map((data: object) => toContainer(data)) }
    })

export interface CreateContainerRequest {
  name: string
  image: string
  size: string
  tags: string[]
}

export const createContainer = (req: CreateContainerRequest): Promise<ApiResponse<Container>> =>
  client.post("/v1/containers", req)
    .then((res) => {
      if (res.status !== 200) {
        return { status: res.status, error: res.data }
      }
      return { status: res.status, data: toContainer(res.data.container) }
    })
