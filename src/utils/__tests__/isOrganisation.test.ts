import { mockUserContext, mockTicketContext } from "@deskpro/app-testing-utils";
import { mockOrganisationContext } from "@/testing";
import { isOrganisation } from "../isOrganisation";
import type { OrganisationContext } from "@/types";

describe("utils", () => {
  describe("isOrganisation", () => {
    test("should be user context", () => {
      expect(isOrganisation(mockOrganisationContext as OrganisationContext)).toBeTruthy();
    });

    test("shouldn't is pass wrong context", () => {
      expect(isOrganisation(mockTicketContext as never)).toBeFalsy();
      expect(isOrganisation(mockUserContext as never)).toBeFalsy();
    });

    test("shouldn't is pass not fully context", () => {
      expect(isOrganisation({ type: "organisation" } as never)).toBeFalsy();
      expect(isOrganisation({ type: "organisation", data: undefined } as never)).toBeFalsy();
      expect(isOrganisation({ type: "organisation", data: {} } as never)).toBeFalsy();
      expect(isOrganisation({ type: "organisation", data: { organisation: undefined } } as never)).toBeFalsy();
      expect(isOrganisation({ type: "organisation", data: { organisation: {} } } as never)).toBeFalsy();
    });
  });
});
