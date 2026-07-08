export function validateMemory(value) {
    if (typeof value != "number" || Number.isNaN(value)) {
        throw new Error("Error: memory recieved not numeric value")
    }
}