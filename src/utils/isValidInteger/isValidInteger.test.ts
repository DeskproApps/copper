import isValidInteger from "./isValidInteger"

describe("isValidInteger", () => {
  describe("with invalid input types", () => {
    it("should return false for non-string/non-number types", () => {
      expect(isValidInteger({} as unknown as string)).toBe(false)
      expect(isValidInteger(null as unknown as string)).toBe(false)
      expect(isValidInteger(undefined as unknown as string)).toBe(false)
      expect(isValidInteger(["Test"] as unknown as string)).toBe(false)
    })
  })

  describe("with string inputs", () => {
    it("should return false for empty strings", () => {
      expect(isValidInteger("")).toBe(false)
      expect(isValidInteger("   ")).toBe(false)
    })

     it("should return true for valid integer strings", () => {
      expect(isValidInteger("97")).toBe(true)
      expect(isValidInteger("-10")).toBe(true)
      expect(isValidInteger("0")).toBe(true)
    })

    it("should return false for invalid number strings", () => {
      expect(isValidInteger("97.1")).toBe(false)
      expect(isValidInteger("Deskpro")).toBe(false)
      expect(isValidInteger("9o7")).toBe(false)
      expect(isValidInteger("9 7")).toBe(false)
      expect(isValidInteger("NaN")).toBe(false)
      expect(isValidInteger(" 97 ")).toBe(false)

    })
  })

  describe("with number inputs", () => {
    it("should return true for integers", () => {
      expect(isValidInteger(97)).toBe(true)
      expect(isValidInteger(0)).toBe(true)
      expect(isValidInteger(-1)).toBe(true)
      expect(isValidInteger(Number.MAX_SAFE_INTEGER)).toBe(true)
      expect(isValidInteger(Number.MIN_SAFE_INTEGER)).toBe(true)
    })

    it("should return false for non-integers", () => {
      expect(isValidInteger(97.7)).toBe(false)
      expect(isValidInteger(NaN)).toBe(false)
    })
  })
})