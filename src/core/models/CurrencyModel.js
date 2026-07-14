export default class CurrencyModel {
    constructor(ticker, rate) {
        this.ticker = ticker
        this.rate = Number(rate)
    }

    getTicker() {
        return this.ticker
    }

    getRate() {
        return this.rate
    }
}