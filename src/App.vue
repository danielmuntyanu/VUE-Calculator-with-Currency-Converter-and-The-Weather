<script setup>
import CalculatorWidget from './components/CalculatorWidget.vue';
import ConverterWidget from './components/ConverterWidget.vue';
import WeatherWidget from './components/WeatherWidget.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';

</script>

<template>
  <main>
    <ThemeSwitcher class="theme_switcher" />
    
    <WeatherWidget class="weather_widget" />

    <div class="calculator_stack">
      <ConverterWidget />

      <CalculatorWidget />
    </div>

  </main>
  
</template>

<style scoped>
@reference './assets/main.css';
 

main {
  @apply 
    min-h-screen flex 
    flex-col justify-between
    md:flex-row md:justify-center 
    items-center p-4 gap-4
  ;
}

.weather_widget {
  @apply 
    h-[25vh] md:h-[600px]
    max-h-[700px] max-w-[430px]
  ;
}

.calculator_stack {
  @apply 
    h-full w-full 
    md:h-[600px]
    max-h-[700px] max-w-[430px]
    flex flex-col justify-between items-center gap-4
  ;
}

.theme_switcher {
  @apply 
    absolute top-2 right-2
  ;
}
</style>
