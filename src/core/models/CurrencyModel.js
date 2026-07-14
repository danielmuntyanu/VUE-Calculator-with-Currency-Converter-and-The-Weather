export default class CurrencyModel {
    constructor(rate, price) {
        this.rate = rate
        this.price = Number(price)
    }

    getRate() {
        return this.rate
    }

    getPrice() {
        return this.price
    }
}