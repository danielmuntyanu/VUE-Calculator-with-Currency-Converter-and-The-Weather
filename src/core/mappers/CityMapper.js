import CityModel from "../models/CityModel"

export default class CityMapper {
    static apiToModel(raw) {
        return new CityModel(
            raw.COD_GEO,
            raw.NOMBRE,
            raw.CODPROV
        )
    }

    static apiToModelList(rawList) {
        return rawList.map(city => CityMapper.apiToModel(city))
    }

    static storageToModel(raw) {
        return new CityModel(
            raw.cityId,
            raw.cityName,
            raw.provinceId,
        )
    }
}