export default class ProvinceModel {

    constructor(provId, provName) {
        this.provId = provId
        this.provName = provName
    }

    getId() {
        return this.provId
    }

    getName() {
        return this.provName
    }

}