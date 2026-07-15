export default class WeatherModel {

    constructor(tempActual, tempMin, tempMax, stateSkyImg) {
        this.tempActual = tempActual
        this.tempMin = tempMin
        this.tempMax = tempMax
        this.stateSkyImg = stateSkyImg
    }

    getTempActual() {
        return this.tempActual
    }

    getTempMin() {
        return this.tempMin
    }


    getTempMax() {
        return this.tempMax
    }


    getStateSkyImg() {
        return this.stateSkyImg
    }


}