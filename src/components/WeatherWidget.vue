<script setup>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import sleep from '@/services/sleep';
import { useWeatherStore } from '@/stores/weather-store';
import { mdiMenuDown } from '@mdi/js';
import { useTheme } from 'vuetify';

const isLoadingProvince = ref(true)
const isLoadingCity = ref(true)
const isLoadingWeather = ref(true)

const weatherStore = useWeatherStore()
const { 
    provList, 
    cityList, 
    currentCity, 
    currentProvince, 
    currentWeather 
} = storeToRefs(weatherStore)

const { 
    initProvinces, 
    initCities, 
    initWeather, 
    chooseCity, 
    chooseProvince 
} = weatherStore

const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)

const chooseProvinceHandler = async (province) => {
    isLoadingCity.value = true
    isLoadingWeather.value = true
    await chooseProvince(province)
    isLoadingCity.value = false
    isLoadingWeather.value = false
}

const chooseCityHandler = async (city) => {
    isLoadingWeather.value = true
    await chooseCity(city)
    isLoadingWeather.value = false
}

const screenWidth = computed(() => {
    return window.innerWidth <= 768
})

function truncate(str) {
    const maxLength = 19
    if (str.length <= maxLength) return str
    const trimmed = str.slice(0, maxLength)
    return trimmed + '...'
}

const images = import.meta.glob('@/assets/images/*.jpg', { eager: true, import: 'default' })

const imageSrc = computed(() => {
    return images[currentWeather.value?.getStateSkyImg()] ?? images['/src/assets/images/default.jpg']
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
            <div class="location_container">
                <div class="province_choose">
                    <v-progress-circular
                        v-if="isLoadingProvince"
                        indeterminate 
                        :width="7"
                    ></v-progress-circular>

                    <v-menu v-else>
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                variant="text"
                                height="50px"
                                width="175px"
                                class="text-lg md:!text-xl px-0 justify-start"
                                :class="isDark ? 'text-glow-dark' : 'text-glow-light'"
                            >
                                {{screenWidth ? truncate(currentProvince.getName().toUpperCase()) : currentProvince.getName().toUpperCase()}}
                                <v-icon 
                                    :icon="mdiMenuDown" 
                                    opacity=0.5
                                />
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                                v-for="(item, index) in provList"
                                :key="index"
                                :value="index"
                                @click="chooseProvinceHandler(item)"
                            >
                                <v-list-item-title>{{ item.getName() }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>

                <div class="city_choose">
                    <v-progress-circular 
                        v-if="isLoadingCity"
                        indeterminate 
                        :width="7"
                    ></v-progress-circular>

                    <v-menu v-else>
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                variant="text"
                                height="50px"
                                width="175px"
                                class="text-lg md:!text-xl px-0 justify-end md:!justify-start"
                                :class="isDark ? 'text-glow-dark' : 'text-glow-light'"
                            >
                                {{screenWidth ? truncate(currentCity.getName().toUpperCase()) : currentCity.getName().toUpperCase()}}
                                <v-icon 
                                    :icon="mdiMenuDown" 
                                    opacity=0.5
                                />
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                                v-for="(item, index) in cityList"
                                :key="index"
                                :value="index"
                                @click="chooseCityHandler(item)"
                            >
                                <v-list-item-title>{{ item.getName() }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
            
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

.location_container {
    @apply 
        flex 
        flex-row justify-between items-center
        md:flex-col md:justify-start md:gap-4 md:items-start
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

.text-glow-light {
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
}

.text-glow-dark {
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
}

</style>
