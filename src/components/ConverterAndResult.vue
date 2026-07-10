<script setup>
import { mdiArrowRight } from '@mdi/js';

import { useCalculatorStore } from '@/stores/calculator-store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const caclStore = useCalculatorStore()
const { inputField, inputOnBg } = storeToRefs(caclStore)

const calcInputFieldFontSize = computed(() => {
    const len = String(inputField.value).length

    if (len > 17) return '0.6rem'
    if (len > 14) return '0.8rem'
    if (len > 11) return '1rem'
    if (len > 9) return '1.2rem'
    return '1.5rem'
})

function calcFieldOnChange(event) {
    inputField.value = event.currentTarget.value
}

function calcFieldOnFocus(event) {
    if (inputField.value == 0) {
        event.currentTarget.value = ''
    }
}

function calcFieldOnBlur(event) {
    if (event.currentTarget.value == '') {
        inputField.value = 0
        event.currentTarget.value = 0
    }
}

const convResultFieldFontSize = computed(() => {
    const len = String(inputField.value).length

    if (len > 17) return '0.6rem'
    if (len > 14) return '0.8rem'
    if (len > 11) return '1rem'
    if (len > 9) return '1.2rem'
    return '1.5rem'
})

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
                

                <div class="calc_inputs_container">
                    <span 
                        class="calc_input_on_bg"
                        :class="inputOnBg ? 'block' : 'hidden'"
                    >
                        {{ inputOnBg }}
                    </span>
                    <input 
                        type="text"
                        class="calc_input_field"
                        :style="{ fontSize: calcInputFieldFontSize }"
                        :value="inputField"
                        @change="calcFieldOnChange"
                        @focus="calcFieldOnFocus"
                        @blur="calcFieldOnBlur"
                    >
                    </input>
                </div>

                <v-icon :icon="mdiArrowRight" />

                <div class="calc_inputs_container">
                    <span 
                        class="calc_input_on_bg"
                        :class="inputOnBg ? 'block' : 'hidden'"
                    >
                        {{ inputOnBg }}
                    </span>
                    <input 
                        type="text"
                        class="calc_input_field"
                        :value="inputField"
                    >
                    </input>
                </div>
            </div>

        </div>

    </section>
    
  <!-- <v-icon class="myclass" :icon="mdiAccount" /> -->
</template>

<style scoped>
@reference '../assets/main.css';
 
section {
    @apply bg-blue-500 w-full h-[20vh] max-h-32;
}

.converter_container {
    @apply 
        w-full h-full
        flex flex-col justify-start items-stretch
    ;
}

.converters_field {
    @apply bg-green-500
        w-full h-full flex flex-row 
        justify-between items-center
        gap-2
    ;
}

.inputs_field {
    @apply 
        w-full h-full bg-red-400
        flex flex-row justify-between items-center
        gap-2
    ;
}

.calc_inputs_container {
    @apply 
        flex flex-col justify-start items-start
        w-full p-2 border rounded-lg
    ;
}

.calc_input_field {
    @apply w-32;
}

.calc_input_on_bg {
    @apply text-base text-gray-700 truncate;
}

</style>
