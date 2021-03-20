import axios, { AxiosInstance } from "axios"

class LaxiosClass {
    private token?: string
    private apiUrl: string

    constructor() {
        const apiUrl = process.env.NEXT_PUBLIC__API_URL

        if (!apiUrl) {
            throw Error("NEXT_PUBLIC__API_URL not defined")
        }

        this.apiUrl = apiUrl
    }

    public setToken(token: string) {
        this.token = token
    }

    public instance(): AxiosInstance {
        if (!this.token) {
            throw Error("Not logged")
        }

        return axios.create({
            baseURL: this.apiUrl,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        })
    }

    public fetcher = async (url: string) => {
        const data = await this.instance().get(url)
        return data.data
    }
}

export const Laxios = new LaxiosClass()
