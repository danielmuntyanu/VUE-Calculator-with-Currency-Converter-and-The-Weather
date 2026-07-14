import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import ConverterRepository from '@/core/apis/converter/ConverterRepository';
import ConverterService from '@/core/apis/converter/ConverterService';

export const useConverterStore = defineStore('conterter', () => {
    const repository = new ConverterRepository()
    const service = new ConverterService(repository)
    
    const leftCur = ref()
    const rightCur = ref()
    const curs = ref([])

    const convResult = computed(() => {
        return 1000;
    })

    async function initCurs() {
        curs.value = await service.getCurrencies()
    }

    return {
        convResult, initCurs
    }
})