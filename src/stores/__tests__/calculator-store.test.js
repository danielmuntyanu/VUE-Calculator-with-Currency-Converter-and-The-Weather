import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { useCalculatorStore } from "../calculator-store";

describe('calculatorStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it("should be '0' as initial value of inputField", () => {
        const store = useCalculatorStore()
        expect(store.inputField).toEqual('0')

    })

    it("should add digit when addDigit() applied", () => {
        const store = useCalculatorStore()

        store.addDigit('4')
        store.addDigit('3')
        store.addDigit('2')
        
        expect(store.inputField).toEqual('432')
    })

    it("should add a dot when addDigit('.') applied", () => {
        const store = useCalculatorStore()

        store.addDigit('.')
        
        expect(store.inputField).toEqual('0.')

    })

    it("should add digit after a dot", () => {
        const store = useCalculatorStore()

        store.addDigit('5')
        store.addDigit('.')
        store.addDigit('3')
        store.addDigit('2')

        expect(store.inputField).toEqual('5.32')
    })

    it("should should no add second dot if it applied twice", () => {
        const store = useCalculatorStore()

        store.addDigit('7')
        store.addDigit('.')
        store.addDigit('.')
        store.addDigit('4')
        store.addDigit('6')
        store.addDigit('.')
        store.addDigit('1')

        expect(store.inputField).toEqual('7.461')
    })

    it("should init all the values if 'AC' applied", () => {
        const store = useCalculatorStore()

        store.addDigit('5')
        store.chooseOperator('+')
        store.addDigit('3')
        expect(store.inputOnBg).toEqual('5')
        expect(store.inputField).toEqual('3')

        store.allClear()

        expect(store.inputField).toEqual('0')

    })

    it("should clear only current value if 'C' applied", () => {
        const store = useCalculatorStore()

        store.addDigit('5')
        store.chooseOperator('+')
        store.addDigit('3')
        expect(store.inputOnBg).toEqual('5')
        expect(store.inputField).toEqual('3')

        store.clearCurrent()

        expect(store.inputOnBg).toEqual('5')
        expect(store.activeOperator).toEqual('+')

    })

    it("should choose and change an operator correctly", () => {
        const store = useCalculatorStore()

        store.addDigit('3')
        store.chooseOperator('-')
        expect(store.activeOperator).toEqual('-')
        
        store.chooseOperator('÷')
        expect(store.activeOperator).toEqual('÷')

    })

    it("should calculate correctly", () => {
        const store = useCalculatorStore()

        store.addDigit('2')
        store.chooseOperator('+')
        store.addDigit('2')
        store.calculate()
        expect(store.inputField).toEqual('4')

        store.allClear()
        store.addDigit('1')
        store.addDigit('0')
        store.addDigit('0')
        store.chooseOperator('x')
        store.addDigit('1')
        store.addDigit('0')
        store.addDigit('0')
        store.calculate()
        expect(store.inputField).toEqual('10000')

        store.allClear()
        store.addDigit('1')
        store.addDigit('0')
        store.chooseOperator('÷')
        store.addDigit('.')
        store.addDigit('5')
        store.calculate()
        expect(store.inputField).toEqual('20')

    })

    it("should repeat last operation if '=' pressed again", () => {
        const store = useCalculatorStore()

        store.addDigit('5')
        store.chooseOperator('+')
        store.addDigit('5')
        store.calculate()
        store.calculate()
        expect(store.inputField).toEqual('15')

        store.allClear()
        store.addDigit('1')
        store.addDigit('0')
        store.addDigit('0')
        store.chooseOperator('-')
        store.addDigit('1')
        store.addDigit('0')
        store.calculate()
        store.calculate()
        store.calculate()
        expect(store.inputField).toEqual('70')

    })

})