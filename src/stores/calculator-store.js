import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCalculatorStore = defineStore('calculator', () => {
  
  // Stores
  const inputField = ref(0)
  const activeOperator = ref(null)
  const inputOnBg = ref(null)
  const equalPressed = ref(false)

  // Getters
  const hasInput = computed(() => {
    if (inputField.value != 0) {
      return true
    } else {
      return false
    }
  })

  const hasCalcInBg = computed(() => {
    if (activeOperator || inputOnBg || inputOnBg == 0) {
      return true
    } else {
      return false
    }
  })

  const clearButton = computed(() => {
    if (hasInput.value) {
      return 'C'
    } else if (hasCalcInBg.value) {
      return 'AC'
    } else {
      return 'AC'
    }
  })

  // Actions
  function allClear() {
    inputField.value = 0
    activeOperator.value = null
    inputOnBg.value = null
  }

  function clearCurrent() {
    inputField.value = 0
  }

  function addDigit(digit) {
    if (equalPressed.value) {
      equalPressed.value = false
      allClear()
    }

    inputField.value = Number(
      String(inputField.value) + String(digit)
    );
  }

  function chooseOperator(oper) {
    if (equalPressed.value) {
      equalPressed.value = false
    }

    if (!activeOperator.value) {
    activeOperator.value = oper
    inputOnBg.value = inputField.value
    console.log(`inputOnBg.value: ${inputOnBg.value}`);
    
    inputField.value = 0
    } else {
      activeOperator.value = oper
    }
    
  }

  function calculate() {

    if (inputOnBg.value == null) return
    
    let result;
    let leftValue;
    let rightValue;

    if (!equalPressed.value) {
      leftValue = inputOnBg.value
      rightValue = inputField.value
    } else {
      leftValue = inputField.value
      rightValue = inputOnBg.value
    }


    switch (activeOperator.value) {
      case '÷': 
        result = leftValue / rightValue
        break;
      case 'x': 
        result = leftValue * rightValue
        break;
      case '-': 
        result = leftValue - rightValue
        break;
      case '+': 
        result = leftValue + rightValue
        break;
      default: 
        result = 0
    }

    console.log(`calc: ${leftValue} ${activeOperator.value} ${rightValue} = ${result}`);
    
    if (!equalPressed.value) {
      inputOnBg.value = inputField.value
      inputField.value = result
    } else {
      inputOnBg.value = rightValue
      inputField.value = result
    }
  
    equalPressed.value = true
  }

  return { 
    inputField, 
    inputOnBg,
    activeOperator,
    clearButton, 
    addDigit, 
    allClear, 
    clearCurrent, 
    chooseOperator, 
    calculate
  }
})


