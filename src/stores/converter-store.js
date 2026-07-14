import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import ConverterRepository from '@/core/apis/converter/ConverterRepository';
import ConverterService from '@/core/apis/converter/ConverterService';
import { convertCurrency } from '@/core/calculate/convert-currency';

export const useConverterStore = defineStore('conterter', () => {
    const repository = new ConverterRepository()
    const service = new ConverterService(repository)
    
    const leftTicker = ref("")
    const rightTicker = ref("")
    const curs = ref([])
    const currentQuantity = ref(0)
    
    const tickersList = computed(() => {
        return curs.value.map((item) => {
            return item.getTicker()
        })
    })

    const convResult = computed(() => {
        if (curs.value.length) {
            const leftRate = curs.value.find((item) => item.getTicker() == leftTicker.value).getRate()
            const rightRate = curs.value.find((item) => item.getTicker() == rightTicker.value).getRate()
            
            return convertCurrency(
                currentQuantity.value,
                leftRate,
                rightRate
            )
        }
        
        return currentQuantity.value;
    })

    async function initCurs() {
        curs.value = await service.getCurrencies()
        leftTicker.value = curs[0] ? curs[0].getTicker() : "USD" 
        rightTicker.value = curs[1] ? curs[1].getTicker() : "EUR"
    }

    return {
        curs, 
        convResult, 
        currentQuantity,
        leftTicker, 
        rightTicker,
        tickersList,
        initCurs
    }
})