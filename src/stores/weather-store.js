import { defineStore } from 'pinia'
import { ref } from 'vue'
import WeatherService from '@/core/apis/weather/WeatherService'
import WeatherRepository from '@/core/apis/weather/WeatherRepository'
import CitiesService from '@/core/apis/weather/CitiesService'
import CitiesRepository from '@/core/apis/weather/CitiesRepository'
import ProvincesService from '@/core/apis/weather/ProvincesService'
import ProvincesRepository from '@/core/apis/weather/ProvincesRepository'
import ProvinceMapper from '@/core/mappers/ProvinceMapper'
import CityMapper from '@/core/mappers/CityMapper'

export const useWeatherStore = defineStore('weather', () => {
  const provRepo = new ProvincesRepository()
  const provService = new ProvincesService(provRepo)
  const provList = ref([]) 
  const currentProvince = ref(null) 

  const cityList = ref([]) 
  const currentCity = ref(null)

  const currentWeather = ref(null) 

  // Actions

  function checkStoredProvince() {
    const parsedData = JSON.parse(window.localStorage.getItem('currentProvince') || null)
    if (!parsedData) return null;
    return ProvinceMapper.storageToModel(parsedData)
  }

  function storeProvince() {
    window.localStorage.setItem('currentProvince', JSON.stringify(currentProvince.value))
    storeCity()
  }

  function checkStoredCity() {
    const parsedData = JSON.parse(window.localStorage.getItem('currentCity') || null)
    if (!parsedData) return null;
    return CityMapper.storageToModel(parsedData)
  }
  function storeCity() {
    window.localStorage.setItem('currentCity', JSON.stringify(currentCity.value))
  }


  async function callCities() {
    if (!currentProvince.value) {
      cityList.value = []
      return
    }

    const cityRepo = new CitiesRepository(currentProvince.value.getId())
    const cityService = new CitiesService(cityRepo)

    cityList.value = await cityService.getCities()
  }

  async function callWeather() {
    const weatherRepo = new WeatherRepository(currentProvince.value.getId(), currentCity.value.getId())
    const weatherService = new WeatherService(weatherRepo)
    
    try {
      currentWeather.value = await weatherService.getWeather()
    } catch (error) {
      await callWeatherCapital()
    }
  }

  async function callWeatherCapital() {
    const curCapitalName = currentProvince.value.getCapital()
    const curCapital = cityList.value.find(item => item.getName() == curCapitalName)
    
    const weatherRepo = new WeatherRepository(currentProvince.value.getId(), curCapital.getId())
    const weatherService = new WeatherService(weatherRepo)
    
    currentWeather.value = await weatherService.getWeather()
  }


  async function initProvinces() {
    provList.value = await provService.getProvinces()
    currentProvince.value = checkStoredProvince() ?? provList.value[5]
  }

  async function initCities() {
    await callCities()
    
    const curCapitalName = currentProvince.value.getCapital()
    const curCapital = cityList.value.find(item => item.getName() == curCapitalName)
    currentCity.value = checkStoredCity() ?? curCapital ?? cityList.value[0]
  }

  async function initWeather() {
    await callWeather()
  }


  async function chooseProvince(province) {
    currentProvince.value = province
    storeProvince()
    
    await callCities()
    const curCapitalName = currentProvince.value.getCapital()
    const curCapital = cityList.value.find(item => item.getName() == curCapitalName)
    currentCity.value = curCapital
    
    await callWeather()
  }

  async function chooseCity(city) {
    currentCity.value = city
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
    currentWeather,
    chooseProvince,
    chooseCity
  }
})
