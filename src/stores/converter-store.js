import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useConverterStore = defineStore('conterter', () => {
    const convResult = computed(() => {
        return 1000;
    })

    return {
        convResult
    }
})