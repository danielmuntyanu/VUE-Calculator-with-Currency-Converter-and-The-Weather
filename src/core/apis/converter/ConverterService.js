import CurrencyModel from "@/core/models/CurrencyModel"

export default class ConverterService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async getCurrencies() {
        try {
            const data = await this.#repo.get()

            const listedCurs = [
                "USD", "EUR", "JPY"
            ] 

            if (!('rates' in data)) {
                throw new Error(
                    `API error: response doesn't have currencies. ${
                    JSON.stringify(data, null, 4)
                    }`
                )
            }

            const rates = data.rates

            const curs = []

            for (key, value in rates) {
                if (listedCurs.includes(key)) {
                    curs.push(
                        new CurrencyModel(key, value)
                    )
                }
            }

            return curs
            
        } catch (error) {
            throw new Error(error)
        }
        
    }

}