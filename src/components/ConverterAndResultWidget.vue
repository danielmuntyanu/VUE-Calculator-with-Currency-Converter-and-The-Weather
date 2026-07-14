<script setup>
import { mdiArrowRight } from '@mdi/js';

import { useConverterStore } from '@/stores/converter-store.js';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import CalcInputField from './CalcInputField.vue';
import ConvResultField from './ConvResultField.vue';

const isLoading = ref(true)

const convStore = useConverterStore()
const { tickersList, leftTicker, rightTicker } = storeToRefs(convStore)
const { initCurs } = convStore

onMounted(async () => {
    await initCurs()
    isLoading.value = false
})

</script>

<template>
    <section>
       
        <div class="converter_container">
            
            <div class="converters_field">
                <v-progress-circular 
                    v-if="isLoading"
                    indeterminate 
                    :width="7"
                ></v-progress-circular>

                <v-menu v-else open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            v-bind="props"
                        >
                            {{leftTicker}}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                        v-for="(item, index) in tickersList"
                        :key="index"
                        :value="index"
                        @click="leftTicker = item"
                        >
                        <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>


                <!-- TITLE -->
                <span class="app_title">
                    ConvCulator+
                </span>


                <v-progress-circular 
                    v-if="isLoading"
                    indeterminate 
                    :width="7"
                ></v-progress-circular>

                <v-menu v-else open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            v-bind="props"
                        >
                            {{ rightTicker }}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                        v-for="(item, index) in tickersList"
                        :key="index"
                        :value="index"
                        @click="rightTicker = item"
                        >
                        <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <div class="inputs_field">
                
                <CalcInputField />

                <v-icon :icon="mdiArrowRight" />

                <ConvResultField />

            </div>

        </div>

    </section>
    
  <!-- <v-icon class="myclass" :icon="mdiAccount" /> -->
</template>

<style scoped>
@reference '../assets/main.css';
 
section {
    @apply w-full h-[20vh] max-h-32;
}

.converter_container {
    @apply 
        w-full h-full
        flex flex-col justify-start items-stretch
    ;
}

.converters_field {
    @apply 
        w-full h-full flex flex-row 
        justify-between items-center
        gap-2
    ;
}

.inputs_field {
    @apply 
        w-full h-full 
        flex flex-row justify-between items-center
        gap-2
    ;
}

.conv_inputs_container {
    @apply 
        flex flex-col justify-start items-start
        w-full px-2 border rounded-lg
    ;
}

.conv_input_field {
    @apply w-32;
}

.conv_input_on_bg {
    @apply opacity-0 text-base text-gray-700 truncate;
}

.app_title {
    @apply text-center text-2xl font-bold text-shadow-2sm text-shadow-green-800  
    ;
}

</style>
