import { mockUserContext, mockTicketContext } from "@deskpro/app-testing-utils";
import { mockOrganisationContext } from "@/testing";
import { isUser } from "../isUser";
import type { UserContext } from "@/types";

describe("utils", () => {
  describe("isUser", () => {
    test("should be user context", () => {
      expect(isUser(mockUserContext as UserContext)).toBeTruthy();
    });

    test("shouldn't is pass wrong context", () => {
      expect(isUser(mockTicketContext as never)).toBeFalsy();
      expect(isUser(mockOrganisationContext as never)).toBeFalsy();
    });

    test("shouldn't is pass not fully context", () => {
      expect(isUser({ type: "user" } as UserContext)).toBeFalsy();
      expect(isUser({ type: "user", data: undefined } as UserContext)).toBeFalsy();
      expect(isUser({ type: "user", data: {} } as UserContext)).toBeFalsy();
      expect(isUser({ type: "user", data: { user: undefined } } as never)).toBeFalsy();
      expect(isUser({ type: "user", data: { user: {} } } as never)).toBeFalsy();
    });
  });
});
