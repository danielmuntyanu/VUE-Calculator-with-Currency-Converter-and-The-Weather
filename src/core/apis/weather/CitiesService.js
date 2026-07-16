import CityMapper from "@/core/mappers/CityMapper"

export default class CitiesService {

    #repo 

    constructor(repository) {
        this.#repo = repository
    }

    async getCities() {
        try {
            const data = await this.#repo.get()
            return CityMapper.apiToModelList(data.municipios)
        } catch (error) {
            throw new Error(error)
        }
    }
}