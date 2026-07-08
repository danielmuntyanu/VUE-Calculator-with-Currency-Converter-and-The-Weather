import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { validateMemory } from '@/services/validate-memory.js'

export const useMemoryStore = defineStore('memory', () => {
  const currentMemory = ref(null)
  
  const getMemory = computed(() => {
    return currentMemory.value;
  })
 
  function storeMemory(data) {
    try {
      validateMemory(data)
    } catch (error) {
      return error;
    }

    currentMemory.value = data;
    return null;
  }

  function resetMemory() {
    currentMemory.value = null;
  }

  return { getMemory, storeMemory, resetMemory }
})


