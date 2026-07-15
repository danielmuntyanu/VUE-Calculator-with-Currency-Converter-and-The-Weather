<script setup>
// import { mdiAccount } from '@mdi/js';
import { onMounted } from 'vue';
import sleep from '@/services/sleep';

onMounted(async () => {

    
})


</script>

<template>
    <section>
        <h1 class="text-center">Weather Widget</h1>
    </section>
   
  <!-- <v-icon class="myclass" :icon="mdiAccount" /> -->
</template>

<style scoped>
@reference '../assets/main.css';

section {
    @apply bg-red-500 w-full h-[20vh];
}

</style>
