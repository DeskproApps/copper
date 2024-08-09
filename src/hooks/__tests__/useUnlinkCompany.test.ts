import { cleanup, renderHook, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { deleteCompanyEntityService } from "@/services/deskpro";
import { mockCompany, mockOrganisationContext } from "@/testing";
import { useUnlinkCompany } from "../useUnlinkCompany";
import { setCurrentContext } from "../../../jest.setup";
import type { Company } from "@/services/copper/types";
import type { Result } from "../useUnlinkCompany";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../useAsyncError", () => ({
  useAsyncError: jest.fn().mockReturnValue({ asyncErrorHandler: jest.fn() }),
}));
jest.mock("../../services/deskpro/deleteCompanyEntityService");

const renderUseUnlinkCompany = () => renderHook<Result, unknown>(() => useUnlinkCompany());

describe("hooks", () => {
  describe("useUnlinkCompany", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("should unlink company", async () => {
      const mockNavigate = jest.fn();
      setCurrentContext(mockOrganisationContext);
      (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
      (deleteCompanyEntityService as jest.Mock).mockResolvedValueOnce(undefined);

      const { result } = renderUseUnlinkCompany();

      await act(async () => {
        await result.current.unlinkCompany(mockCompany as Company);
      });

      expect(deleteCompanyEntityService).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/companies/home");
    });
  });
});
