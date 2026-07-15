import CityModel from "@/core/models/CityModel";

export default class CitiesService {

    #repo 

    constructor(repository) {
        this.#repo = repository
    }

    async getCities() {
        try {
            const data = this.#repo.get()

            const citiesArray = []

            data.municipios.forEach(city => {
                citiesArray.push(
                    new CityModel(
                        city.COD_GEO,
                        city.NOMBRE,
                        city.CODPROV
                    )
                )
            });

            return citiesArray

        } catch (error) {
            throw new Error(error)
        }
    }
}