import { ApiResponse, client, remapFields } from "./index"

export interface Account {
  id: string
  name: string
  email: string
  avatarUrl: string
  apiKey: string
  admin: boolean
  createdAt: Date
}

const toAccount = (data: object): Account => {
  const account = remapFields(data, {
    avatar_url: "avatarUrl",
    api_key: "apiKey",
    created_at: "createdAt",
  })
  account.createdAt = new Date(account.createdAt)
  return account
}

export const getAccount = (): Promise<ApiResponse<Account>> =>
  client.get("/v1/account")
    .then((res) => {
      if (res.status !== 200) {
        return { status: res.status, error: res.data }
      }
      return { status: res.status, data: toAccount(res.data.account) }
    })

export const syncAccount = (): Promise<ApiResponse<Account>> =>
  client.post("/v1/account/sync")
    .then((res) => {
      if (res.status !== 200) {
        return { status: res.status, error: res.data }
      }
      return { status: res.status, data: toAccount(res.data.account) }
    })

export const regenerateApiKey = (): Promise<ApiResponse<Account>> =>
  client.post("/v1/account/regenerate_apikey")
    .then((res) => {
      if (res.status !== 200) {
        return { status: res.status, error: res.data }
      }
      return { status: res.status, data: toAccount(res.data.account) }
    })
