<script setup>
import { useCalculatorStore } from '@/stores/calculator-store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const calcStore = useCalculatorStore()
const { inputField, inputOnBg, activeOperator } = storeToRefs(calcStore)
const showSnackbar = ref(false)

const calcInputFieldFontSize = computed(() => {
    const len = String(inputField.value).length

    if (len > 17) return '0.6rem'
    if (len > 14) return '0.8rem'
    if (len > 11) return '1rem'
    if (len > 9) return '1.2rem'
    return '1.5rem'
})

const copyResult = async (event) => {
    try {
        await navigator.clipboard.writeText(inputField.value)
        showSnackbar.value = true
        console.log('Скопировано в буфер');
        
    } catch (error) {
        console.error('Ошибка при копировании в буфер')
    }
}

</script>

<template>

    <div class="calc_inputs_container">
        <span 
            class="calc_input_on_bg"
            :style="{ opacity: inputOnBg != null ? 0.70 : 0 }"
        >
            {{ activeOperator }}
            {{ inputOnBg != null ? inputOnBg : 'none' }}
        </span>
        <span
            class="calc_input_field"
            :style="{ fontSize: calcInputFieldFontSize }"
            @click="copyResult"
        >
            {{ inputField }}
        </span>
    </div>
    <v-snackbar 
        v-model="showSnackbar" 
        color="primary"
        variant="tonal"
        timeout="1500"
    >
        Copied to Clipboard
    </v-snackbar>
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
    @apply w-32 cursor-pointer select-none;
}

.calc_input_on_bg {
    @apply text-base truncate select-none;
}

</style>