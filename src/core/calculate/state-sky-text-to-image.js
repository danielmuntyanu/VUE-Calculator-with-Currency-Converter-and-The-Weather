    export function getStateSkyImage(description) {
        if (typeof description != 'string' || !description.trim()) {
            return "default.png"
        }
        
        description = description.toLowerCase()

        const clear_sky_keywords = [
            'despejado', 'claro', 'sereno'
        ]
        const cloudy_keywords = [
            'nubosos', 'nuboso', 'nubes', 'nublado',
            'intervalos nubosos', 'poco nuboso', 'muy nuboso',
            'cubierto', 'nubes altas', 'nublados'
        ]
        const rain_keywords = [
            'lluvia', 'lluvioso', 'lluvias', 'llovizna',
            'chubascos', 'chubasco', 'precipitaciones', 'aguacero'
        ]
        const storm_keywords = [
            'tormenta', 'tormentas', 'granizo', 'rayos',
            'eléctrica', 'tronada'
        ]

        const snow_keywords = [
            'nieve', 'nevadas', 'nevando', 'nevado'
        ]

        const isClearSky = clear_sky_keywords.some(kw => description.includes(kw))

        const isCloudy = cloudy_keywords.some(kw => description.includes(kw))

        const isRaining = rain_keywords.some(kw => description.includes(kw))

        const isStormy = storm_keywords.some(kw => description.includes(kw))

        const isSnowy = snow_keywords.some(kw => description.includes(kw))


        // Choosing image logic

        if (isStormy) return 'storm.png'

        if (isSnowy) return 'snow.png'

        if (isRaining) return 'raining.png'

        if (isCloudy) return 'cloudy.png'

        if (isClearSky) return 'clear-sky.png'

        return 'default.png'

    }