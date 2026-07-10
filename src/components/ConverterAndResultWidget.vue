<script setup>
import { mdiArrowRight } from '@mdi/js';

import { useCalculatorStore } from '@/stores/calculator-store';
import { useConverterStore } from '@/stores/converter-store.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import CalcInputField from './CalcInputField.vue';
import ConvResultField from './ConvResultField.vue';

const caclStore = useCalculatorStore()
const { inputField } = storeToRefs(caclStore)

const { convResult } = storeToRefs(useConverterStore())



</script>

<template>
    <section>
       
        <div class="converter_container">
            <div class="converters_field">
                <v-menu open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn
                        color="primary"
                        v-bind="props"
                        >
                        $
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                        v-for="(item, index) in items"
                        :key="index"
                        :value="index"
                        >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-menu open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            v-bind="props"
                        >
                        $
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                        v-for="(item, index) in items"
                        :key="index"
                        :value="index"
                        >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
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

</style>
