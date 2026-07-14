export function convertCurrency(quantity, priceLeft, priceRight) {
    const result = (quantity / priceLeft) * priceRight
    return parseFloat(result.toFixed(2))
}