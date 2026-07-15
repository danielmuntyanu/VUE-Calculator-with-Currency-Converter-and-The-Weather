export default class WeatherModel {

    constructor(tempActual, tempMin, tempMax, stateSkyId) {
        this.tempActual = tempActual
        this.tempMin = tempMin
        this.tempMax = tempMax
        this.stateSkyId = stateSkyId
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


    getStateSkyId() {
        return this.stateSkyId
    }


}