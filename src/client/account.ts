import { client, remapFields } from "."

export interface Account {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  apiKey: string;
  admin: boolean;
  createdAt: Date;
}

const toAccount = (data: object): Account => {
  const container = remapFields(data, {
    avatar_url: "avatarUrl",
    api_key: "apiKey",
    created_at: "createdAt",
  })
  container.createdAt = new Date(container.createdAt)
  return container
}

export const get = (): Promise<Account> =>
  client.get("/v1/account").then((res) => {
    if (res.status !== 200) {
      throw new Error(res.data.message)
    }
    return toAccount(res.data.account)
  })

export const sync = (): Promise<Account> =>
  client.post("/v1/account/sync").then((res) => {
    if (res.status !== 200) {
      throw new Error(res.data.message)
    }
    return toAccount(res.data.account)
  })

export const regenerateApiKey = (): Promise<Account> =>
  client.post("/v1/account/regenerate_apikey").then((res) => {
    if (res.status !== 200) {
      throw new Error(res.data.message)
    }
    return toAccount(res.data.account)
  })
