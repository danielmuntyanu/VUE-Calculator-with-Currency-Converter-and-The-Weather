import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import WeatherService from '@/core/apis/weather/WeatherService'
import WeatherRepository from '@/core/apis/weather/WeatherRepository'
import CitiesService from '@/core/apis/weather/CitiesService'
import CitiesRepository from '@/core/apis/weather/CitiesRepository'
import ProvincesService from '@/core/apis/weather/ProvincesService'
import ProvincesRepository from '@/core/apis/weather/ProvincesRepository'

defineStore('weather', () => {
  const provRepo = new ProvincesRepository()
  const provService = new ProvincesService(provRepo)
  const provList = ref([]) // <- ProvinceModel[]
  const currentProvince = ref(null) // <- ProvinceModel || null

  const cityList = ref([]) // <- CityModel[]
  const currentCity = ref(null) // <- CityModel || null

  const currentWeather = ref(null) // <- WeatherModel

  // Actions

  function checkStoredProvince() {
    return JSON.parse(window.localStorage.getItem('currentProvince') || null)
  }
  function storeProvince() {
    window.localStorage.setItem('currentProvince', JSON.stringify(currentProvince.value))
  }

  function checkStoredCity() {
    return JSON.parse(window.localStorage.getItem('currentCity') || null)
  }
  function storeCity() {
    window.localStorage.setItem('currentCity', JSON.stringify(currentProvince.value))
  }


  async function callCities() {
    if (!currentProvince.value) {
      cityList.value = []
      return
    }
    const cityRepo = new CitiesRepository(currentProvince.value.getId())
    const cityService = new CitiesService(cityRepo)

    cityList.value = await cityService.value.getCities()
  }

  async function callWeather() {
    const weatherRepo = new WeatherRepository(currentProvince.getId(), currentCity.value.getId())
    const weatherService = new WeatherService(weatherRepo)
    currentWeather.value = await weatherService.getWeather()
  }


  async function initProvinces() {
    provList.value = await provService.getProvinces()
    currentProvince.value = checkStoredProvince() ?? provList.value[0]
  }

  async function initCities() {
    await callCities()
    currentCity.value = checkStoredCity() ?? cityList.value[0]
  }

  async function initWeather() {
    await callWeather()
  }


  async function chooseProvinceHandler(province) {
    currentProvince.value = province
    storeProvince()
    await initCities()
  }

  async function chooseCityHandler(city) {
    currentCity = city
    storeCity()
    await callWeather()
  }


  return {
    initProvinces,
    initCities,
    initWeather,
    provList,
    cityList,
    currentProvince,
    currentCity,
    chooseProvinceHandler,
    chooseCityHandler
  }
})
