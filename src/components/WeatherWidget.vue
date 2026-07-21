<script setup>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import sleep from '@/services/sleep';
import { useWeatherStore } from '@/stores/weather-store';
import { useTheme } from 'vuetify';
import WeatherLocation from './WeatherLocation.vue';

const isLoadingProvince = ref(true)
const isLoadingCity = ref(true)
const isLoadingWeather = ref(true)

const weatherStore = useWeatherStore()
const { currentWeather } = storeToRefs(weatherStore)

const { 
    initProvinces, 
    initCities, 
    initWeather, 
} = weatherStore

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

const images = import.meta.glob('@/assets/images/*.jpg', { eager: true, import: 'default' })

const imageSrc = computed(() => {
    return images[currentWeather.value?.getStateSkyImg()] ?? images["/src/assets/images/default.jpg"]
})

const sheetStyles = computed(() => ({
    backgroundImage: isDark.value
        ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imageSrc.value})`
        : `url(${imageSrc.value})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    borderColor: 'rgb(var(--v-theme-primary))',
    borderWidth: '3'
}))

onMounted(async () => {
    
    await initProvinces()
    isLoadingProvince.value = false
    await sleep(500)

    await initCities()
    isLoadingCity.value =false
    await sleep(500)
    
    await initWeather()
    isLoadingWeather.value = false
})

</script>

<template>
    <section>
        <v-sheet 
            border
            rounded="xl"
            elevation="3"
            :style="sheetStyles"
            class="weather_container"
        >
            <weather-location 
                v-model:is-loading-city="isLoadingCity"
                v-model:is-loading-province="isLoadingProvince"
                v-model:is-loading-weather="isLoadingWeather"
            />
            
            <span 
                class="temp_actual"
                :class="isDark ? 'text-glow-dark' : 'text-glow-light'"
            >
                {{ currentWeather?.getTempActual() ?? '*' }}°
            </span>

            <div class="temp_minmax_container">
                <span 
                    class="temp_minmax"
                    :class="isDark ? 'text-glow-dark' : 'text-glow-light'"    
                >
                    <span class="opacity-70">Min:</span> 
                    {{ currentWeather?.getTempMin() ?? '*' }}°
                </span>
                <span 
                    class="temp_minmax"
                    :class="isDark ? 'text-glow-dark' : 'text-glow-light'"
                >
                    <span class="opacity-70">Max:</span>
                    {{ currentWeather?.getTempMax() ?? '*' }}°
                </span>
            </div>

            <div class="desktop_margin_element"></div>
        </v-sheet>
        
    </section>
   
</template>

<style scoped>
@reference '../assets/main.css';

section {
    @apply w-full h-full pt-4;
}

.weather_container {
    @apply 
        h-full p-4 
        flex flex-col justify-between items-start
    ;
}

.temp_actual {
    @apply 
        text-4xl font-black
    ;
}

.temp_minmax_container {
    @apply 
        flex md:flex-col gap-4

    ;
}

.temp_minmax {
    @apply 
        text-2xl font-bold inline-flex gap-1
    ;
}

.desktop_margin_element {
    @apply 
        hidden md:block h-[35%] w-20
    ;
}

</style>
