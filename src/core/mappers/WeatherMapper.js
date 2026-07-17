import WeatherModel from "../models/WeatherModel";
import { getStateSkyImage } from "../calculate/state-sky-text-to-image";

export default class WeatherMapper {
    static toModel(raw) {
        return new WeatherModel(
            raw.temperatura_actual,
            raw.temperaturas.min,
            raw.temperaturas.max,
            '@/assets/images/' + getStateSkyImage(raw.stateSky.description)
        )
    }
}