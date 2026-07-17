<script setup>
import CalculatorWidget from './components/CalculatorWidget.vue';
import ConverterWidget from './components/ConverterWidget.vue';
import WeatherWidget from './components/WeatherWidget.vue';

</script>

<template>
  <main>
    <WeatherWidget />

    <ConverterWidget />

    <CalculatorWidget />

  </main>
  
</template>

<style scoped>
@reference './assets/main.css';
 

main {
  @apply min-h-screen flex flex-col justify-between items-center p-4;
}
</style>
