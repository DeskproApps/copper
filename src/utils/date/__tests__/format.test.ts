import { format } from "../format";

const mockTimestamp = 1715684105;
const mockDate = "5/31/2024";

describe("utils", () => {
  describe("date", () => {
    describe("format", () => {
      test("should return formatted date", () => {
        expect(format(mockTimestamp)).toBe("14 May 2024");
        expect(format(mockDate)).toBe("31 May 2024");
      });

      test("should return formatted date with time", () => {
        expect(format(mockTimestamp, { time: true })).toBe("14 May 2024, 10:55");
        expect(format(mockDate, { time: true })).toBe("31 May 2024, 00:00");
      });

      test("should return formatted time", () => {
        expect(format(mockTimestamp, { date: false, time: true })).toBe("10:55");
        expect(format(mockDate, { date: false, time: true })).toBe("00:00");
      });

      test("should return undefined if it's not a date", () => {
        expect(format("random")).toBeUndefined();
        expect(format("100500")).toBeUndefined();
      });

      test.each([undefined, null, "", 0, true, false, [], {}])("wrong value: %p", (payload) => {
        expect(format(payload as never)).toBeUndefined();
      });
    });
  });
});
