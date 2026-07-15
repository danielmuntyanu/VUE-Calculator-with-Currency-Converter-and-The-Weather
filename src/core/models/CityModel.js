export default class CityModel {

    constructor(cityId, cityName, provinceId) {
        this.cityId = cityId
        this.cityName = cityName
        this.provinceId = provinceId
    }

    getName() {
        return this.cityName
    }

    getId() {
        return this.cityId
    }

    getProvinceId() {
        return this.provinceId
    }

}