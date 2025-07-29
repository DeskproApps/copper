import { handleNavigation } from "./handleNavigation";
import { automaticallyLinkEntity } from "@/services/deskpro";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { DeskproOrganisation, DPUser } from "@/types";

jest.mock("@/services/deskpro", () => ({
  automaticallyLinkEntity: jest.fn(),
}))

const mockClient = {} as IDeskproClient
const mockNavigate = jest.fn()

const mockOrg = {
  id: "org1",
  name: "Test Org",
} as DeskproOrganisation

const mockUser = {
  id: "user1",
  primaryEmail: "user@test.com",
} as DPUser

describe("handleNavigation", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("organisation view", () => {
    it("should navigate to /companies/link?filter=... if successful and multiple", async () => {
      (automaticallyLinkEntity as jest.Mock).mockResolvedValue({
        success: true,
        isMultiple: true,
      })

      await handleNavigation(mockClient, {
        view: "organisation",
        deskproOrganisation: mockOrg,
        navigate: mockNavigate,
      })

      expect(mockNavigate).toHaveBeenCalledWith(`/companies/link?filter=${encodeURIComponent(mockOrg.name)}`)
    })

    it("should navigate to /companies if successful and a single match", async () => {
      (automaticallyLinkEntity as jest.Mock).mockResolvedValue({
        success: true,
        isMultiple: false,
      })

      await handleNavigation(mockClient, {
        view: "organisation",
        deskproOrganisation: mockOrg,
        navigate: mockNavigate,
      })

      expect(mockNavigate).toHaveBeenCalledWith(`/companies`)
    })

    it("should navigate to /companies/link if linking fails", async () => {
      (automaticallyLinkEntity as jest.Mock).mockResolvedValue({
        success: false,
        isMultiple: false,
      })

      await handleNavigation(mockClient, {
        view: "organisation",
        deskproOrganisation: mockOrg,
        navigate: mockNavigate,
      })

      expect(mockNavigate).toHaveBeenCalledWith(`/companies/link`)
    })

    it("should do nothing if deskproOrganisation is undefined", async () => {
      await handleNavigation(mockClient, {
        view: "organisation",
        deskproOrganisation: undefined,
        navigate: mockNavigate,
      })

      expect(mockNavigate).not.toHaveBeenCalled()
      expect(automaticallyLinkEntity).not.toHaveBeenCalled()
    })
  })

  describe("user view", () => {
    it("should navigate to /home if linking user succeeds", async () => {
      (automaticallyLinkEntity as jest.Mock).mockResolvedValue({
        success: true,
      })

      await handleNavigation(mockClient, {
        view: "user",
        deskproUser: mockUser,
        navigate: mockNavigate,
      })

      expect(mockNavigate).toHaveBeenCalledWith("/home")
    })

    it("should navigate to /contacts/link if linking user fails", async () => {
      (automaticallyLinkEntity as jest.Mock).mockResolvedValue({
        success: false,
      })

      await handleNavigation(mockClient, {
        view: "user",
        deskproUser: mockUser,
        navigate: mockNavigate,
      })

      expect(mockNavigate).toHaveBeenCalledWith("/contacts/link")
    })

    it("should do nothing if deskproUser is undefined", async () => {
      await handleNavigation(mockClient, {
        view: "user",
        deskproUser: undefined,
        navigate: mockNavigate,
      })

      expect(mockNavigate).not.toHaveBeenCalled()
      expect(automaticallyLinkEntity).not.toHaveBeenCalled()
    })
  })
})
