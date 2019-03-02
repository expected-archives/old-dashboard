import axios from "axios"
import * as containers from "./containers"

const client = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3000",
  headers: {
    Authorization: document.cookie.split("=")[1],
  },
})

const remapFields = (obj: any, fields: any): any =>
  Object.entries(obj)
    .map(([key, value]) => [fields[key] || key, value])
    .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {})

export { client, remapFields, containers }
