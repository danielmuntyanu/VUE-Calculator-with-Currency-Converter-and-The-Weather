export function validateMemory(value) {
    value = Number(value)
    
    if (typeof value != "number" || Number.isNaN(value)) {
        throw new Error("Error: memory recieved not numeric value")
    }

    return null;
}