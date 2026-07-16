import ProvinceMapper from "@/core/mappers/ProvinceMapper"

export default class ProvincesService {

    #repo 

    constructor(repository) {
        this.#repo = repository
    }

    async getProvinces() {
        try {
            const data = await this.#repo.get()
            return ProvinceMapper.apiToModelList(data.provincias)
        } catch (error) {
            throw new Error(error)
        }
    }
}