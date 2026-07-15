import ProvinceModel from "@/core/models/ProvinceModel"

export default class ProvincesService {

    #repo 

    constructor(repository) {
        this.#repo = repository
    }

    async getProvinces() {
        try {
            const data = this.#repo.get()

            const provincesArray = []

            data.provincias.forEach(prov => {
                provincesArray.push(
                    new ProvinceModel(
                        prov.CODPROV,
                        prov.NOMBRE_PROVINCIA
                    )
                )
            });

            return provincesArray

        } catch (error) {
            throw new Error(error)
        }
    }
}