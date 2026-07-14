export default class Repository {

    constructor(uri) {
        this.uri = uri
    }

    getUri() {
        return this.uri
    }

    async get() {
        try {
            const response = await fetch(this.uri)

            if (!response.ok) {
                throw new Error(`API error: ${response.status} - ${response.body}`)
            }

            const data  = await response.json()
            return data;
            
        } catch (error) {
            throw new Error(`API error: ${error}`)
        }
    }

}