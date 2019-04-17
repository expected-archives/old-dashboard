import { client, ErrorResponse, remapFields } from "./index"

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

export interface ContainerResponse {
  container: Container
}

export interface ListContainerResponse {
  containers: Container[]
}

export const getContainers = (): Promise<ListContainerResponse | ErrorResponse> =>
  client.get("/v1/containers")
    .then((res) => {
      if (res.status !== 200) {
        return res.data
      }
      return { containers: res.data.containers.map((data: object) => toContainer(data)) }
    })

export interface CreateContainerRequest {
  name: string
  image: string
  size: string
  tags: string[]
}

export const createContainer = (req: CreateContainerRequest): Promise<ContainerResponse | ErrorResponse> =>
  client.post("/v1/containers", req)
    .then((res) => {
      if (res.status !== 200) {
        return res.data
      }
      return { container: res.data.container }
    })
