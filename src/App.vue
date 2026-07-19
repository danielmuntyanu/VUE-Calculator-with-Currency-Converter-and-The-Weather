<script setup>
import CalculatorWidget from './components/CalculatorWidget.vue';
import ConverterWidget from './components/ConverterWidget.vue';
import WeatherWidget from './components/WeatherWidget.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';

</script>

<template>
  <main>
    <ThemeSwitcher />
    <WeatherWidget />

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
    items-center p-4
  ;
}

.calculator_stack {
  @apply 
    h-full w-full max-h-[700px] max-w-[430px]
    flex flex-col justify-between items-center gap-4
  ;
}
</style>
