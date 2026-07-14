import Repository from "@/core/models/Repository";

export default class ConverterRepository extends Repository {

    constructor() {
        const URI = `${import.meta.env.VITE_CONVERTER_API_URI}?apikey=${import.meta.env.VITE_CONVERTER_API_KEY}`
        super(URI)
    }
}