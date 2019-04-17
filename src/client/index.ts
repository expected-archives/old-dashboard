import axios from "axios"
import * as container from "./container"
import * as account from "./account"
import * as image from "./image"

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

export const remapFields = (obj: any, fields: any): any =>
  Object.entries(obj)
    .map(([key, value]) => [fields[key] || key, value])
    .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {})

export interface ErrorResponse {
  message: string
  errors?: object
}

export default { ...account }

export { container, account, image }
