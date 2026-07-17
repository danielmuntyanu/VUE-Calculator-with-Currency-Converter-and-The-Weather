export default class ProvinceModel {
    
    constructor(provId, provName, provCapital) {
        this.provId = provId
        this.provName = provName
        this.provCapital = provCapital
    }

    getId() {
        return this.provId
    }

    getName() {
        return this.provName
    }

    getCapital() {
        return this.provCapital
    }

}