import { DeskproOrganisation, DPUser } from "@/types";
import { getCompanies, getPersonByEmailService } from "@/services/copper";
import { getEntityList, setEntity } from "@/services/deskpro/";
import automaticallyLinkEntity from "./automaticallyLinkEntity";
import { IDeskproClient } from "@deskpro/app-sdk";

jest.mock("@/services/copper");
jest.mock("@/services/deskpro/");

const mockClient = {} as IDeskproClient;

describe("automaticallyLinkEntity", () => {
  const mockOrganisation = {
    id: "org-123",
    name: "Test Org"
  } as DeskproOrganisation

  const mockUser = {
    id: "user-123",
    primaryEmail: "test@example.com"
  } as DPUser

  beforeEach(() => {
    jest.clearAllMocks()
  }) 

  describe("Organisation linking", () => {
    it("should return success if an organisation is already linked", async () => {
      (getEntityList as jest.Mock).mockResolvedValue([{ id: "existing-link" }]) 

      const result = await automaticallyLinkEntity(mockClient, {
        type: "organisation",
        organisation: mockOrganisation
      }) 

      expect(result).toEqual({ success: true }) 
      expect(getEntityList).toHaveBeenCalledWith(mockClient, {
        type: "organisation",
        organisationId: "org-123"
      }) 
      expect(getCompanies).not.toHaveBeenCalled() 
    }) 

    it("should return failure when no matching company found", async () => {
      (getEntityList as jest.Mock).mockResolvedValue([]);
      (getCompanies as jest.Mock).mockResolvedValue([]);

      const result = await automaticallyLinkEntity(mockClient, {
        type: "organisation",
        organisation: mockOrganisation
      })

      expect(result).toEqual({
        success: false,
        message: "No Copper company with the provided name."
      })
      expect(getCompanies).toHaveBeenCalledWith(mockClient, { name: "Test Org" });
      expect(setEntity).not.toHaveBeenCalled();
    })

    it("should return success with isMultiple when multiple companies found", async () => {
      (getEntityList as jest.Mock).mockResolvedValue([]);
      (getCompanies as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const result = await automaticallyLinkEntity(mockClient, {
        type: "organisation",
        organisation: mockOrganisation
      })

      expect(result).toEqual({
        success: true,
        isMultiple: true
      })
      expect(setEntity).not.toHaveBeenCalled();
    })

    it("should link organisation when exactly one matching company found", async () => {
      (getEntityList as jest.Mock).mockResolvedValue([]);
      (getCompanies as jest.Mock).mockResolvedValue([{ id: 123 }]);
      (setEntity as jest.Mock).mockResolvedValue(undefined);

      const result = await automaticallyLinkEntity(mockClient, {
        type: "organisation",
        organisation: mockOrganisation
      })

      expect(result).toEqual({ success: true })
      expect(setEntity).toHaveBeenCalledWith(mockClient, {
        type: "organisation",
        organisationId: "org-123",
        entityKey: "123"
      })
    })
  })

  describe("User linking", () => {
    it("should return success if user is already linked", async () => {
      (getEntityList as jest.Mock).mockResolvedValue([{ id: "existing-link" }]);

      const result = await automaticallyLinkEntity(mockClient, {
        type: "user",
        user: mockUser
      })

      expect(result).toEqual({ success: true })
      expect(getEntityList).toHaveBeenCalledWith(mockClient, {
        type: "user",
        userId: "user-123"
      })
      expect(getPersonByEmailService).not.toHaveBeenCalled()
    })

    it("should return failure when no contact found with the email", async () => {
      (getEntityList as jest.Mock).mockResolvedValue([]);
      (getPersonByEmailService as jest.Mock).mockResolvedValue(null);

      const result = await automaticallyLinkEntity(mockClient, {
        type: "user",
        user: mockUser
      })

      expect(result).toEqual({
        success: false,
        message: "No contact found with the provided email"
      })
      expect(getPersonByEmailService).toHaveBeenCalledWith(mockClient, "test@example.com");
      expect(setEntity).not.toHaveBeenCalled();
    })

    it("should link user when contact is found", async () => {
      (getEntityList as jest.Mock).mockResolvedValue([]);
      (getPersonByEmailService as jest.Mock).mockResolvedValue({ id: 456 });
      (setEntity as jest.Mock).mockResolvedValue(undefined);

      const result = await automaticallyLinkEntity(mockClient, {
        type: "user",
        user: mockUser
      })

      expect(result).toEqual({ success: true });
      expect(setEntity).toHaveBeenCalledWith(mockClient, {
        type: "user",
        userId: "user-123",
        entityKey: "456"
      })
    })
  })
})