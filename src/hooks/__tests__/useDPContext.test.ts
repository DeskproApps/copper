import { cleanup, renderHook } from "@testing-library/react";
import { mockUserContext } from "@deskpro/app-testing-utils";
import { mockOrganisationContext } from "@/testing";
import { setCurrentContext } from "../../../jest.setup";
import { useDPContext } from "../useDPContext";
import type { Result } from "../useDPContext";

const renderUseDPContext = () => renderHook<Result, unknown>(() => useDPContext());

describe("hooks", () => {
  describe("useDPContext", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("should return user context", async () => {
      setCurrentContext(mockUserContext);
      const { result } = renderUseDPContext();

      expect(result.current.isUserCtx).toBeTruthy();
      expect(result.current.dpUser).toMatchObject({ id: "1000" });

      expect(result.current.isOrgCtx).toBeFalsy();
      expect(result.current.dpOrg).toBeNull();
    });

    test("should return organisation context", async () => {
      setCurrentContext(mockOrganisationContext);
      const { result } = renderUseDPContext();

      expect(result.current.isOrgCtx).toBeTruthy();
      expect(result.current.dpOrg).toMatchObject({ id: "2" });

      expect(result.current.isUserCtx).toBeFalsy();
      expect(result.current.dpUser).toBeNull();
    });
  });
});
