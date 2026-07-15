import Repository from "@/core/models/Repository";

export default class CitiesRepository extends Repository {

    constructor(provinceId) {
        const URI = `${import.meta.env.VITE_WEATHER_API_URI}/provincias/${provinceId}/municipios`
        super(URI)
    }
}