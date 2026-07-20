import axios from "axios"

export default class Repository {

    constructor(uri) {
        this.uri = uri
    }

    getUri() {
        return this.uri
    }

    async get() {
        try {
            const response = await axios.get(this.uri)
            return response.data
        } catch (error) {
            throw new Error(`API error: ${error}`)
        }
    }

}