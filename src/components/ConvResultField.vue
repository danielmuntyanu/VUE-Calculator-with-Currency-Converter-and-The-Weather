<script setup>
import { computed } from 'vue';
import { useConverterStore } from '@/stores/converter-store';
import { storeToRefs } from 'pinia';

const { convResult } = storeToRefs(useConverterStore())

const copyConvResult = async () => {
    try {
        await navigator.clipboard.writeText(convResult.value)
        showSnackbar.value = true
        console.log('Скопировано в буфер');
        
    } catch (error) {
        console.error('Ошибка при копировании в буфер')
    }
}

const convResultFieldFontSize = computed(() => {
    const len = String(convResult.value).length

    if (len > 17) return '0.6rem'
    if (len > 14) return '0.8rem'
    if (len > 11) return '1rem'
    if (len > 9) return '1.2rem'
    return '1.5rem'
})

</script>


<template>
    <div class="conv_inputs_container">
        <span 
            class="conv_input_on_bg"
        >
            .
        </span>
        <span 
            class="conv_input_field"
            :style="{ fontSize: convResultFieldFontSize }"
            @click="copyConvResult"
        >
            {{ convResult }}
        </span>
    </div>
</template>



<style scoped>
@reference '../assets/main.css';

.conv_inputs_container {
    @apply 
        flex flex-col justify-start items-start
        w-full px-2 border rounded-lg
    ;
}

.conv_input_field {
    @apply w-32 cursor-pointer select-none;
}

.conv_input_on_bg {
    @apply opacity-0 text-base text-gray-700 truncate;
}

</style>