<script setup>
import { useCalculatorStore } from '@/stores/calculator-store';
import { useConverterStore } from '@/stores/converter-store';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const calcStore = useCalculatorStore()
const { inputField, inputOnBg, activeOperator } = storeToRefs(calcStore)
const showSnackbar = ref(false)

const { currentQuantity } = storeToRefs(useConverterStore())

const calcInputFieldFontSize = computed(() => {
    const len = inputField.value.length

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
    } catch (error) {
        console.error('Ошибка при копировании в буфер')
    }
}

watch(inputField, (newValue, oldValue) => {
    currentQuantity.value = Number(newValue)
})

</script>

<template>

    <div>
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

        <v-snackbar 
            v-model="showSnackbar" 
            color="primary"
            variant="tonal"
            timeout="1500"
        >
            Copied to Clipboard
        </v-snackbar>
    </div>
    
</template>


<style scoped>
@reference '../assets/main.css';

.calc_input_on_bg {
    @apply text-base truncate select-none;
}

.calc_input_field {
    @apply m-0 w-[90%] cursor-pointer select-none;
}

</style>