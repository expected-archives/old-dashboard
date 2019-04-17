import { ErrorResponse, remapFields, client } from "./index"

export interface Account {
  id: string
  name: string
  email: string
  avatarUrl: string
  apiKey: string
  admin: boolean
  createdAt: Date
}

export interface AccountResponse {
  account: Account
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

export const getAccount = (): Promise<AccountResponse | ErrorResponse> =>
  client.get("/v1/account")
    .then((res) => {
      if (res.status !== 200) {
        return res.data
      }
      return { account: toAccount(res.data.account) }
    })

export const syncAccount = (): Promise<AccountResponse | ErrorResponse> =>
  client.post("/v1/account/sync")
    .then((res) => {
      if (res.status !== 200) {
        return res.data
      }
      return { account: toAccount(res.data.account) }
    })

export const regenerateApiKey = (): Promise<AccountResponse | ErrorResponse> =>
  client.post("/v1/account/regenerate_apikey")
    .then((res) => {
      if (res.status !== 200) {
        return res.data
      }
      return { account: toAccount(res.data.account) }
    })
