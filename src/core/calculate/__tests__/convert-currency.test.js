import { describe, it, expect } from "vitest";
import { convertCurrency } from "../convert-currency";

describe('convertCurrency', () => {
    it('should calculate correct USD -> EUR', () => {
        const res = convertCurrency(
            100,
            1.00,
            0.878464
        )
        expect(res).toEqual(87.85)
    })

    it('should calculate correct EUR -> USD', () => {
        const res = convertCurrency(
            100,
            0.878464,
            1.00
        )
        expect(res).toEqual(113.84)
    })

    it('should calculate correct USD -> JPY', () => {
        const res = convertCurrency(
            100,
            1.00,
            162.42
        )
        expect(res).toEqual(16242)
    })

    it('should calculate correct JPY -> USD', () => {
        const res = convertCurrency(
            100,
            162.42,
            1.00
        )
        expect(res).toEqual(0.62)
    })

    it('should calculate correct JPY -> EUR', () => {
        const res = convertCurrency(
            100,
            162.42,
            0.878464,
        )
        expect(res).toEqual(0.54)
    })

    it('should calculate correct EUR -> JPY ', () => {
        const res = convertCurrency(
            100,
            0.878464,
            162.42
        )
        expect(res).toEqual(18489.09)
    })


    // return the same quantity value

    it('should return quantity when JPY -> JPY', () => {
        const res = convertCurrency(
            100,
            162.42,
            162.42
        )
        expect(res).toEqual(100)
    })

    it('should return quantity when USD -> USD', () => {
        const res = convertCurrency(
            100,
            1.00,
            1.00
        )
        expect(res).toEqual(100)
    })

    it('should return quantity when EUR -> EUR', () => {
        const res = convertCurrency(
            100,
            0.878464,
            0.878464
        )
        expect(res).toEqual(100)
    })

    it('should return 0 if quantity is 0', () => {
        const res = convertCurrency(
            0,
            0.878464,
            1.00
        )
        expect(res).toEqual(0)
    })
})