<script setup>
import { ref, computed } from 'vue';
import { useConverterStore } from '@/stores/converter-store';
import { storeToRefs } from 'pinia';

const props = defineProps(['currency'])

const { convResult } = storeToRefs(useConverterStore())
const showSnackbar = ref(false)

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
    <div>
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
            <span class="opacity-50">
                {{ currency }}
            </span>
        </span>

        <v-snackbar 
            v-model="showSnackbar" 
            color="primary"
            variant="tonal"
            timeout="1500"
            rounded="xl"
        >
            Copied to Clipboard
        </v-snackbar>
    </div>
</template>



<style scoped>
@reference '../assets/main.css';

.conv_input_field {
    @apply 
        w-32 cursor-pointer select-none
        inline-flex gap-2
    ;
}

.conv_input_on_bg {
    @apply opacity-0 text-base text-gray-700 truncate;
}

</style>