<script setup>
import CalculatorControlsWidget from './components/CalculatorControlsWidget.vue';
import ConverterAndResultWidget from './components/ConverterAndResultWidget.vue';
import WeatherWidget from './components/WeatherWidget.vue';

</script>

<template>
  <main>
    <WeatherWidget />

    <ConverterAndResultWidget />

    <CalculatorControlsWidget />

  </main>
  
</template>

<style scoped>
@reference './assets/main.css';
 

main {
  @apply min-h-screen flex flex-col justify-between items-center p-4;
}
</style>
