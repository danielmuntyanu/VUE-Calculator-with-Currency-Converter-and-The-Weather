import WeatherMapper from "@/core/mappers/WeatherMapper"

export default class WeatherService {

    #repo
    
    constructor(repository) {
        this.#repo = repository
    }

    async getWeather() {
        try {
            const data = await this.#repo.get()
            return WeatherMapper.toModel(data)
        } catch (error) {
            throw new Error(error)
        }
    }
}