import { getAddress } from "../getAddress";
import { mockContact } from "@/testing";

const mockAddress = mockContact.address;

const mockStreet = "79 Hartfield Rd";
const mockCity = "London";
const mockPostalCode = "SW19 3ES";
const mockCountry = "GB";

describe("utils", () => {
  describe("getAddress", () => {
    test("should return address in one line", () => {
      expect(getAddress(mockAddress as never))
        .toBe("1 Volodymyrska Street, Kyiv, Kyiv City, 01001, Ukraine");
    });

    test("should return partial address in one line", () => {
      expect(getAddress({ country: mockCountry } as never)).toBe("United Kingdom");
      expect(getAddress({ street: mockStreet } as never)).toBe("79 Hartfield Rd");
      expect(getAddress({ city: mockCity } as never)).toBe("London");
      expect(getAddress({ postal_code: mockPostalCode } as never)).toBe("SW19 3ES");
      expect(getAddress({
        city: mockCity,
        street: mockStreet,
      } as never)).toBe("79 Hartfield Rd, London");
    });

    test.each(
      [undefined, null, "", 0, true, false, {}
    ])("wrong value: %p", (payload) => {
      expect(getAddress(payload as never)).toBe("-");
    });
  });
});
