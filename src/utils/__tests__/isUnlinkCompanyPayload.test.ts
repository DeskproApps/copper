import { isUnlinkCompanyPayload } from "../isUnlinkCompanyPayload";
import { mockCompany } from "@/testing";
import type { UnlinkCompanyPayload } from "@/types";

describe("utils", () => {
  describe("isUnlinkCompanyPayload", () => {
    test("should be unlink company payload", () => {
      const payload = { type: "unlink_company", company: mockCompany } as UnlinkCompanyPayload;
      expect(isUnlinkCompanyPayload(payload)).toBeTruthy();
    });

    test("shouldn't be unlink company payload", () => {
      expect(isUnlinkCompanyPayload({ type: "unlink_company" } as unknown as UnlinkCompanyPayload)).toBeFalsy();
      expect(isUnlinkCompanyPayload({ type: "unlink" } as unknown as UnlinkCompanyPayload)).toBeFalsy();
    });
  });
});

