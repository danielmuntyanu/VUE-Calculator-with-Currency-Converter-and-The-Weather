import ProvinceModel from "../models/ProvinceModel"

export default class ProvinceMapper {
    static apiToModel(raw) {
        return new ProvinceModel(
            raw.CODPROV,
            raw.NOMBRE_PROVINCIA,
            raw.CAPITAL_PROVINCIA
        )
    }

    static apiToModelList(rawList) {
        return rawList.map(prov => ProvinceMapper.apiToModel(prov))
    }

    static storageToModel(raw) {
        return new ProvinceModel(
            raw.provId,
            raw.provName,
            raw.provCapital
        )
    }
}

const fafa = new ProvinceMapper()

const dede = ProvinceMapper.apiToModel({"name": "Sanya"})