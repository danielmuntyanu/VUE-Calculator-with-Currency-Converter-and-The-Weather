<script setup>
import CalculatorControls from './components/CalculatorControls.vue';
import WeatherWidget from './components/WeatherWidget.vue';
import ConverterAndResult from './components/ConverterAndResult.vue';

// import { mdiAccount } from '@mdi/js';
</script>

<template>
  <main>
    <WeatherWidget />

    <ConverterAndResult />

    <CalculatorControls />
  </main>
  
  <!-- <v-icon class="myclass" :icon="mdiAccount" /> -->
</template>

<style scoped>
@reference './assets/main.css';
 

main {
  @apply min-h-screen flex flex-col justify-between items-center p-4;
}
</style>
