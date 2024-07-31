import { nbsp } from "@/constants";
import { formatPrice } from "../formatPrice";

describe("utils", () => {
  describe("formatPrice", () => {
    test("should format price", () => {
      expect(formatPrice(100500.005, "EUR")).toBe("€100,500.01");
      expect(formatPrice(100500)).toBe("£100,500.00");
      expect(formatPrice(100500, "USD")).toBe("$100,500.00");
      expect(formatPrice(100500, "UAH")).toBe(`UAH${nbsp}100,500.00`);
    });
  });
});
