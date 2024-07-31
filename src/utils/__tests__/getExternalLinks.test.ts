import { getExternalLinks } from "../getExternalLinks";

describe("utils", () => {
  describe("getExternalLinks", () => {
    describe("contact", () => {
      test("should return contact link", () => {
        expect(getExternalLinks.contact(100, 500))
        .toBe("https://app.copper.com/companies/100/app#/browse/list/people/default?fullProfile=people-500");
      });
      test("shouldn't return contact link", () => {
        expect(getExternalLinks.contact(100)).toBeNull();
        expect(getExternalLinks.contact(undefined, 100)).toBeNull();
      });
    });

    describe("company", () => {
      test("should return link", () => {
        expect(getExternalLinks.company(100, 500))
          .toBe(`https://app.copper.com/companies/100/app#/browse/list/companies/default?fullProfile=companies-500`)
      });
      test("shouldn't return link", () => {
        expect(getExternalLinks.company(100)).toBeNull();
        expect(getExternalLinks.company(undefined, 100)).toBeNull();
      });
    });
  });
});
