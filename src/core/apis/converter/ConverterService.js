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
                "USD", "EUR", "JPY", "UAH", "TRY"
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

            for (const [key, value] of Object.entries(rates)) {
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