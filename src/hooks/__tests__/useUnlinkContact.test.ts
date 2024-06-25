import { cleanup, renderHook, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { deleteEntityService, getEntityListService } from "../../services/deskpro";
import { useUnlinkContact } from "../useUnlinkContact";
import type { Result } from "../useUnlinkContact";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../useAsyncError", () => ({
  useAsyncError: jest.fn().mockReturnValue({ asyncErrorHandler: jest.fn() }),
}));
jest.mock("../../services/deskpro/deleteEntityService");
jest.mock("../../services/deskpro/getEntityListService");

const renderUseUnlinkContact = () => renderHook<Result, unknown>(() => useUnlinkContact());

describe("hooks", () => {
  describe("useUnlinkContact", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("should unlink contact", async () => {
      const mockNavigate = jest.fn();
      (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
      (getEntityListService as jest.Mock).mockResolvedValueOnce(["1"]);
      (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);

      const { result } = renderUseUnlinkContact();

      await act(async () => {
        await result.current.unlink();
      });

      expect(getEntityListService).toHaveBeenCalled();
      expect(deleteEntityService).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/contacts/link");
    });

    test("should unlink all contacts if there is more than one", async () => {
      const mockNavigate = jest.fn();
      (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
      (getEntityListService as jest.Mock).mockResolvedValueOnce(["1", "2", "3"]);
      (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);

      const { result } = renderUseUnlinkContact();

      await act(async () => {
        await result.current.unlink();
      });

      expect(deleteEntityService).toHaveBeenCalledTimes(3);
    });
  });
});
