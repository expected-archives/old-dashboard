import { client, remapFields } from "./index"

export interface Container {
  key: string
  name: string
  status: string
  image: string
  endpoint: string
  memory: number
  tags: string[]
  createdAt: Date
}

const toContainer = (data: object): Container => {
  const container = remapFields(data, { created_at: "createdAt" })
  container.createdAt = new Date(container.createdAt)
  return container
}

export const list = (): Promise<Container[]> =>
  client.get("/v1/containers").then((res) => {
    if (res.status !== 200) {
      throw new Error(res.data.message)
    }
    return res.data.containers.map((data: object) => toContainer(data))
  })

export interface CreateRequest {
  name: string
  image: string
  size: string
  tags: string[]
}

export const create = (req: CreateRequest): Promise<Container> =>
  client.post("/v1/containers", req)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(res.data.message)
      }
      return toContainer(res.data.container)
    })
