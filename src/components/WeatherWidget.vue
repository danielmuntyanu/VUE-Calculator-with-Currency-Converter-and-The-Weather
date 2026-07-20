<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import sleep from '@/services/sleep';
import { useWeatherStore } from '@/stores/weather-store';
import { mdiDotsHorizontal, mdiMenuDown } from '@mdi/js';

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

function truncate(str) {
    const maxLength = 19
    if (str.length <= maxLength) return str
    const trimmed = str.slice(0, maxLength)
    // return trimmed.slice(0, trimmed.lastIndexOf(' ')) + '...'
    return trimmed + '...'
}

</script>

<template>
    <section>
        <v-sheet 
            border
            :style="{ borderColor: 'rgb(var(--v-theme-primary))' }"
            rounded="xl"
            :image="currentWeather?.getStateSkyImg() ?? '@/assets/images/default.png'"
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
                                class="text-lg px-0 justify-start"
                            >
                                {{truncate(currentProvince.getName().toUpperCase())}}
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
                                class="text-lg px-0 justify-end md:justify-start"
                            >
                                {{ truncate(currentCity.getName().toUpperCase()) }}
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
            

            <h1>{{ currentWeather?.getTempActual() ?? '*' }}</h1>
            <h1>{{ currentWeather?.getTempMin() ?? '*' }}</h1>
            <h1>{{ currentWeather?.getTempMax() ?? '*' }}</h1>
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
    ;
}

.location_container {
    @apply 
        flex 
        flex-row justify-between items-center
        md:flex-col md:justify-start md:gap-4 md:items-start
    ;
}

</style>
