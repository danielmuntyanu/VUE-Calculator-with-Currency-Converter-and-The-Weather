<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useCalculatorStore } from '@/stores/calculator-store';
import { useMemoryStore } from '@/stores/memory-store';
import { storeToRefs } from 'pinia';

const caclStore = useCalculatorStore()
const { inputField, clearButton, activeOperator, equalPressed } = storeToRefs(caclStore)
const { addDigit, allClear, clearCurrent, chooseOperator, calculate } = caclStore

const memoryStore = useMemoryStore()
const { getMemory } = storeToRefs(memoryStore)
const { storeMemory, resetMemory } = memoryStore

function memoryRead() {
    if (getMemory.value != null) {
        inputField.value = getMemory.value
    }
}

const buttonNames = [
    'M+', 'MR', 'MC',
    '1', '2', '3', '÷',
    '4', '5', '6', 'x',
    '7', '8', '9', '-',
    '.', '0', '=', '+',
]

const btnHandler = async (input) => {
    switch (input) {
        case 'M+': storeMemory(inputField.value); break;
        case 'MR': memoryRead(); break;
        case 'MC': resetMemory(); break;
        case 'C': clearCurrent(); break;
        case 'CE': allClear(); break;
        case '0': addDigit('0'); break;
        case '1': addDigit('1'); break;
        case '2': addDigit('2'); break;
        case '3': addDigit('3'); break;
        case '4': addDigit('4'); break;
        case '5': addDigit('5'); break;
        case '6': addDigit('6'); break;
        case '7': addDigit('7'); break;
        case '8': addDigit('8'); break;
        case '9': addDigit('9'); break;
        case '.': addDigit('.'); break;
        case '÷': chooseOperator('÷'); break;
        case 'x': chooseOperator('x'); break;
        case '-': chooseOperator('-'); break;
        case '+': chooseOperator('+'); break;
        case '=': calculate(); break;
        default: return
    }
}


const keyMap = {
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
    '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    '.': '.', ',': '.', 
    '+': '+', '-': '-',
    '*': 'x', 'x': 'x',
    '/': '÷',
    'Enter': '=', '=': '=',
    'Escape': 'CE',
    'Backspace': 'C',
}

const handleKeydown = (event) => {
    const mapped = keyMap[event.key]
    if (mapped === undefined) return

    event.preventDefault()
    btnHandler(mapped)
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})

</script>

<template>
    <section>
        <div class="buttons_grid">

            <v-btn 
                key="0"
                :value="clearButton"
                variant="elevated"
                :id="`btn_${clearButton}`"
                rounded="xl"
                @click="btnHandler(clearButton)"
                color="primary"
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
                rounded="xl"
                @click="btnHandler(item)"
                class="calc_button"
                
                :color="
                    activeOperator == item || 
                    (item == '=' && equalPressed) 
                    ? 'secondary' : 'primary'
                "
            >
                {{ item }}
            </v-btn>
            

        </div>
    
    </section>
  
</template>

<style scoped>
@reference '../assets/main.css';
 
section {
    @apply w-full h-[50vh] pb-10 py-4 ;
}

.buttons_grid {
    @apply 
        w-full h-full
        grid grid-cols-4 gap-4
        place-content-between
    ;
}

.calc_button {
    @apply h-10;
}

</style>
