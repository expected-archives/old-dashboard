import axios from "axios"

export interface IAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  apiKey: string;
  admin: boolean;
  createdAt: Date;
}

export interface IContainer {
  id: string
  name: string
  status: string
  image: string
  endpoint: string
  memory: number
  tags: string[]
  createdAt: Date
}

export interface IContainerPlan {
  id: string
  name: string
  price: number
  cpu: number
  memory: number
  available: boolean
}

export interface CreateContainerRequest {
  name: string
  image: string
  size: string
  tags: string[]
}

const remapFields = (obj: any, fields: any): any =>
  Object.entries(obj)
    .map(([key, value]) => [fields[key] || key, value])
    .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {})

const toAccount = (data: object): IAccount => {
  const account = remapFields(data, {
    avatar_url: "avatarUrl",
    api_key: "apiKey",
    created_at: "createdAt",
  })
  account.createdAt = new Date(account.createdAt)
  return account
}

const toContainer = (data: object): IContainer => {
  const container = remapFields(data, {
    created_at: "createdAt",
  })
  container.createdAt = new Date(container.createdAt)
  return container
}

export const client = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3000",
  transformRequest(data, headers) {
    headers.Authorization = document.cookie.split("=")[1]
    return data
  },
  validateStatus() {
    return true
  },
})

export const getAccount = (): Promise<IAccount> =>
  client.get("/v1/account").then((res) => {
    if (res.status !== 200) {
      throw new Error(res.data.message)
    }
    return toAccount(res.data.account)
  })

export const syncAccount = (): Promise<IAccount> =>
  client.post("/v1/account/sync").then((res) => {
    if (res.status !== 200) {
      throw new Error(res.data.message)
    }
    return toAccount(res.data.account)
  })

export const regenerateApiKey = (): Promise<IAccount> =>
  client.post("/v1/account/regenerate_apikey").then((res) => {
    if (res.status !== 200) {
      throw new Error(res.data.message)
    }
    return toAccount(res.data.account)
  })

export const getContainers = (): Promise<IContainer[]> =>
  client.get("/v1/containers").then((res) => {
    if (res.status !== 200) {
      throw new Error(res.data.message)
    }
    return res.data.containers.map((data: object) => toContainer(data))
  })

export const createContainer = (req: CreateContainerRequest): Promise<IContainer> =>
  client.post("/v1/containers", req)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(res.data.message)
      }
      return toContainer(res.data.container)
    })

export const getContainerPlans = (): Promise<IContainerPlan[]> =>
  client.get("/v1/containers/plans")
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(res.data.message)
      }
      return res.data.plans
    })
