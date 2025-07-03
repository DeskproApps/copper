/**
 * Checks whether the given value is a valid integer.
 *
 *
 * Note: If passing a string, leading/trailing whitespace should be removed 
 * before calling the function. For example, `" 97 "` is considered invalid.
 *
 * 
 * @example
 * isValidInteger(" 97 ") // false
 * isValidInteger("97") // true
 * isValidInteger("9.7") // false
 */
export default function isValidInteger(value: string | number): boolean {

    if (typeof value === "number") {
        return Number.isInteger(value)
    }

    if (typeof value !== "string" || value.trim() === '') {
        return false
    }

    // Prevent returning true for numbers with surrounding whitespace.
    if (value !== value.trim()) {
    return false
  }

    const valueAsNumber = Number(value)
    return Number.isInteger(valueAsNumber)
}