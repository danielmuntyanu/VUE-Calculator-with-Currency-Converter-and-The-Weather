<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import sleep from '@/services/sleep';
import { useWeatherStore } from '@/stores/weather-store';

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

    await initCities()
    isLoadingCity.value =false

    await initWeather()
    isLoadingWeather.value = false
})


</script>

<template>
    <section>
        <div class="weather_container">
            <div class="province_choose">
                <v-progress-circular
                    v-if="isLoadingProvince"
                    indeterminate 
                    :width="7"
                ></v-progress-circular>

                <v-menu v-else open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            v-bind="props"
                        >
                            {{currentProvince.getName()}}
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

                <v-menu v-else open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            v-bind="props"
                        >
                            {{ currentCity.getName() }}
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

            <img :src="currentWeather?.getStateSkyImg() ?? '@/assets/images/default.png'" />

            <h1>{{ currentWeather?.getTempActual() ?? '*' }}</h1>
            <h1>{{ currentWeather?.getTempMin() ?? '*' }}</h1>
            <h1>{{ currentWeather?.getTempMax() ?? '*' }}</h1>
        </div>
        
    </section>
   
</template>

<style scoped>
@reference '../assets/main.css';

section {
    @apply bg-red-500 w-full h-[20vh];
}

</style>
