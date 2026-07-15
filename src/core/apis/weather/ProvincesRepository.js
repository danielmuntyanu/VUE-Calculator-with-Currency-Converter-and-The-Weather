import Repository from "@/core/models/Repository";

export default class ProvincesRepository extends Repository {

    constructor() {
        const URI = `${import.meta.env.VITE_WEATHER_API_URI}/provincias`
        super(URI)
    }
}