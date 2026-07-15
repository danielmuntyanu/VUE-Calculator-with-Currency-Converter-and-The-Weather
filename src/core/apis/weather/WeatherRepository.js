import Repository from "@/core/models/Repository";

export default class WeatherRepository extends Repository {

    constructor(provinceId, cityId) {
        const URI = `${import.meta.env.VITE_WEATHER_API_URI}/provincias/${provinceId}/municipios/${cityId}`
        super(URI)
    }
}