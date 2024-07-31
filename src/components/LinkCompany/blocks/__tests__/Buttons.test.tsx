import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@deskpro/app-testing-utils";
import { mockSearchCompanies } from "@/testing";
import { Buttons } from "../Buttons";
import type { Company } from "@/services/copper/types";
import type { Props } from "../Buttons";

const renderButtons = (props?: Partial<Props>) => render((
  <Buttons
    onCancel={props?.onCancel || jest.fn()}
    isSubmitting={props?.isSubmitting || false}
    onLinkCompanies={props?.onLinkCompanies || jest.fn()}
    selectedCompanies={props?.selectedCompanies || mockSearchCompanies as Company[]}
  />
), { wrappers: { theme: true } });

describe("LinkCompany", () => {
  describe("Buttons", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByRole } = renderButtons();
      const linkButton = await findByRole("button", { name: "Link Companies" });
      const cancelButton = await findByRole("button", { name: "Cancel" });

      expect(linkButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test("shouldn't click \"Link Companies\" if no linked companies", async () => {
      const mockOnLink = jest.fn();
      const { findByRole } = renderButtons({
        selectedCompanies: [],
        onLinkCompanies: mockOnLink,
      });
      const linkButton = await findByRole("button", { name: "Link Companies" });

      await userEvent.click(linkButton as Element);

      expect(mockOnLink).not.toHaveBeenCalled();
    });

    test("should click \"Link Companies\"", async () => {
      const mockOnLink = jest.fn();
      const { findByRole } = renderButtons({ onLinkCompanies: mockOnLink });
      const linkButton = await findByRole("button", { name: "Link Companies" });

      await userEvent.click(linkButton as Element);

      expect(mockOnLink).toHaveBeenCalled();
    });

    test("should click \"Cancel\"", async () => {
      const mockOnCancel = jest.fn();
      const { findByRole } = renderButtons({ onCancel: mockOnCancel });
      const cancelButton = await findByRole("button", { name: "Cancel" });

      await userEvent.click(cancelButton as Element);

      expect(mockOnCancel).toHaveBeenCalled();
    });
  });
});
