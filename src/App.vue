<script setup>
import CalculatorWidget from './components/CalculatorWidget.vue';
import ConverterWidget from './components/ConverterWidget.vue';
import WeatherWidget from './components/WeatherWidget.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';

</script>

<template>
  <main>
    <ThemeSwitcher class="theme_switcher" />
    
    <WeatherWidget class="weathe_widget" />

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

.weathe_widget {
  @apply 
    h-[25vh] 
    max-h-[700px] max-w-[430px]
  ;
}

.calculator_stack {
  @apply 
    h-full w-full 
    max-h-[700px] max-w-[430px]
    flex flex-col justify-between items-center gap-4
  ;
}

.theme_switcher {
  @apply 
    absolute top-4 right-4
  ;
}
</style>
