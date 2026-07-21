import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCalculatorStore = defineStore('calculator', () => {
  
  // Stores
  const inputField = ref("0")
  const activeOperator = ref(null)
  const inputOnBg = ref(null)
  const equalPressed = ref(false)
  const dotEntered = ref(false)
  const justPressedOrepator = ref(false)

  // Getters
  const hasInput = computed(() => {
    if (inputField.value == "0" || inputField.value == 'ERROR') {
      return false
    } 
    return true
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
      return 'CE'
    } else {
      return 'CE'
    }
  })

  // Actions
  function allClear() {
    inputField.value = "0"
    activeOperator.value = null
    inputOnBg.value = null
    activeOperator.value = null
    equalPressed.value = false
    dotEntered.value = false
    justPressedOrepator.value = false
  }

  function clearCurrent() {
    justPressedOrepator.value = false

    inputField.value = "0"
  }

  function addDigit(digit) {
    justPressedOrepator.value = false

    if (inputField.value == 'ERROR') {
      return
    }

    if (equalPressed.value) {
      equalPressed.value = false
      allClear()
    }

    // if dot clicked again
    if (digit == '.' && dotEntered.value) return

    // if dot clicked but it already exists in the inputField
    if (digit == '.' && inputField.value.includes('.')) return

    if (digit == '.') {
      dotEntered.value = true
    }

    if (dotEntered.value && digit != '.') {
      dotEntered.value = false
    } 

    let newValue = inputField.value + digit

    if (digit != '.') {
      newValue = String(Number(newValue))
    }
    
    if (Number.isNaN(Number(newValue)) || !Number.isFinite(Number(newValue))) {
      inputField.value = 'ERROR'
    } else {
      inputField.value = newValue;
    }
  }

  function chooseOperator(oper) {
    if (inputField.value == 'ERROR') {
      return
    }
    
    if (!activeOperator.value) {
      // pressing operator for first time
      activeOperator.value = oper
      inputOnBg.value = inputField.value
      inputField.value = "0"
    } else {
      if (justPressedOrepator.value) {
        // change choice of operator in the moment
        activeOperator.value = oper
      } else {
        // next operation on pressing operator after digits or equal
        if (!equalPressed.value) {
          calculate()
        }
        activeOperator.value = oper
        inputOnBg.value = inputField.value
        inputField.value = "0"
      }
    }

    if (equalPressed.value) {
      equalPressed.value = false
    }

    justPressedOrepator.value = true
    
  }

  function calculate() {
    justPressedOrepator.value = false
    
    if (inputField.value == 'ERROR') {
      return
    }
    
    if (inputOnBg.value == null) return
    
    let result;
    let leftValue;
    let rightValue;

    if (!equalPressed.value) {
      leftValue = Number(inputOnBg.value)
      rightValue = Number(inputField.value)
    } else {
      leftValue = Number(inputField.value)
      rightValue = Number(inputOnBg.value)
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

    // console.log(`calc: ${leftValue} ${activeOperator.value} ${rightValue} = ${result}`);
    
    if (!equalPressed.value) {
      inputOnBg.value = inputField.value
      inputField.value = String(result)
    } else {
      inputOnBg.value = rightValue
      inputField.value = String(result)
    }
  
    equalPressed.value = true
  }

  return { 
    inputField, 
    inputOnBg,
    activeOperator,
    equalPressed,
    clearButton, 
    addDigit, 
    allClear, 
    clearCurrent, 
    chooseOperator, 
    calculate
  }
})


