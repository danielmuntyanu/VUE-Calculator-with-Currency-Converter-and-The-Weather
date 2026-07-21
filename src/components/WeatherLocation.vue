<script setup>
import { mdiMenuDown } from '@mdi/js';
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather-store';
import { useTheme } from 'vuetify';

const isLoadingProvince = defineModel("isLoadingProvince")
const isLoadingCity = defineModel("isLoadingCity")
const isLoadingWeather = defineModel("isLoadingWeather")

const weatherStore = useWeatherStore()
const { 
    provList, 
    cityList, 
    currentCity, 
    currentProvince, 
} = storeToRefs(weatherStore)

const { 
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

</script>

<template>
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
</template>

<style scoped>
@reference '../assets/main.css';

.location_container {
    @apply 
        flex 
        flex-row justify-between items-center
        md:flex-col md:justify-start md:gap-4 md:items-start
    ;
}

</style>