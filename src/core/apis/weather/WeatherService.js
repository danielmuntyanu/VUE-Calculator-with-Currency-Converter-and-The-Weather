import { getStateSkyImage } from "@/core/calculate/state-sky-text-to-image";
import WeatherModel from "@/core/models/WeatherModel";

export default class WeatherService {

    #repo
    
    constructor(repository) {
        this.#repo = repository
    }

    async getWeather() {
        try {
            const data = await this.#repo.get()

            const weather = new WeatherModel(
                data.temperatura_actual,
                data.temperaturas.min,
                data.temperaturas.max,
                getStateSkyImage(data.stateSky.description)
            )

            return weather

        } catch (error) {
            throw new Error(error)
        }
    }
}