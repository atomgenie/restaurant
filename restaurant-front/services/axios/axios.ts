import axios from "axios"

const apiUrl = process.env.NEXT_PUBLIC__API_URL

if (!apiUrl) {
    throw Error("NEXT_PUBLIC__API_URL not defined")
}

export const api = axios.create({
    baseURL: apiUrl,
})
