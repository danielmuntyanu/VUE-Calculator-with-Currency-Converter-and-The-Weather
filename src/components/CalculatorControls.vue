<script setup>
import { computed, ref } from 'vue';
import { useCalculatorStore } from '@/stores/calculator-store';
import { useMemoryStore } from '@/stores/memory-store';
import { storeToRefs } from 'pinia';

const caclStore = useCalculatorStore()
const { inputField, clearButton, activeOperator } = storeToRefs(caclStore)
const { addDigit, allClear, clearCurrent, chooseOperator, calculate } = caclStore

const memoryStore = useMemoryStore()
const { getMemory } = storeToRefs(memoryStore)
const { storeMemory, resetMemory } = memoryStore

const buttonNames = [
    'M+', 'MR', 'MC',
    '1', '2', '3', '÷',
    '4', '5', '6', 'x',
    '7', '8', '9', '-',
    '.', '0', '=', '+',
]

function memoryRead() {
    if (getMemory.value != null) {
        inputField.value = getMemory.value
    }
}

const btnHandler = async (input) => {
    console.log(input)

    switch (input) {
        case 'M+': storeMemory(inputField.value); break;
        case 'MR': memoryRead(); break;
        case 'MC': resetMemory(); break;
        case 'C': clearCurrent(); break;
        case 'AC': allClear(); break;
        case '0': addDigit(0); break;
        case '1': addDigit(1); break;
        case '2': addDigit(2); break;
        case '3': addDigit(3); break;
        case '4': addDigit(4); break;
        case '5': addDigit(5); break;
        case '6': addDigit(6); break;
        case '7': addDigit(7); break;
        case '8': addDigit(8); break;
        case '9': addDigit(9); break;
        case '.': addDigit('.'); break;
        case '÷': chooseOperator('÷'); break;
        case 'x': chooseOperator('x'); break;
        case '-': chooseOperator('-'); break;
        case '+': chooseOperator('+'); break;
        case '=': calculate(); break;
        default: return
    }
}

// import { mdiAccount } from '@mdi/js';
</script>

<template>
    <section>
        <div class="buttons_grid">

            <v-btn 
                key="0"
                :value="clearButton"
                variant="elevated"
                :id="`btn_${clearButton}`"
                @click="btnHandler(clearButton)"
                class="calc_button"
                
            >
                {{ clearButton }}
            </v-btn>

            <v-btn 
                v-for="(item, index) in buttonNames"
                :key="index + 1"
                :value="item"
                :id="`btn_${item}`"
                variant="elevated"
                @click="btnHandler(item)"
                class="calc_button"
                
                :class="activeOperator == item ? 'activated_button' : ''"
            >
                {{ item }}
            </v-btn>
            

        </div>
    
    </section>
  
  <!-- <v-icon class="myclass" :icon="mdiAccount" /> -->
</template>

<style scoped>
@reference '../assets/main.css';
 
section {
    @apply w-full h-[50vh] pb-10;
}

.buttons_grid {
    @apply 
        w-full h-full
        grid grid-cols-4 gap-4
        place-content-between
    ;
}

.calc_button {
    @apply bg-green-800 h-10;
}

.activated_button {
    @apply bg-green-500;
}

</style>
