<script setup>
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

</script>

<template>

    <div class="calc_inputs_container">
        <span 
            class="calc_input_on_bg"
            :style="{ opacity: inputOnBg != null ? 100 : 0 }"
        >
            {{ inputOnBg != null ? inputOnBg : 'none' }}
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

</template>


<style scoped>
@reference '../assets/main.css';
 

.calc_inputs_container {
    @apply 
        flex flex-col justify-start items-start
        w-full px-2 border rounded-lg
    ;
}

.calc_input_field {
    @apply w-32;
}

.calc_input_on_bg {
    @apply text-base text-gray-700 truncate;
}

</style>