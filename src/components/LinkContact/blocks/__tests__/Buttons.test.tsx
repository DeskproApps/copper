import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@deskpro/app-testing-utils";
import { mockContact } from "@/testing";
import { Buttons } from "../Buttons";
import type { Props } from "../Buttons";

const renderButtons = (props?: Partial<Props>) => render((
  <Buttons
    onCancel={props?.onCancel || jest.fn()}
    isSubmitting={props?.isSubmitting || false}
    onLinkContact={props?.onLinkContact || jest.fn()}
    selectedContact={props?.selectedContact || null}
  />
), { wrappers: { theme: true } });

describe("LinkContact", () => {
  describe("Buttons", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByRole } = renderButtons();
      const linkButton = await findByRole("button", { name: "Link Contact" });
      const cancelButton = await findByRole("button", { name: "Cancel" });

      expect(linkButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test("shouldn't click \"Link Contact\" if no linked contact", async () => {
      const mockOnLinkContact = jest.fn();
      const { findByRole } = renderButtons({ onLinkContact: mockOnLinkContact });
      const linkButton = await findByRole("button", { name: "Link Contact" });

      await userEvent.click(linkButton as Element);

      expect(mockOnLinkContact).not.toHaveBeenCalled();
    });

    test("should click \"Link Contact\"", async () => {
      const mockOnLinkContact = jest.fn();
      const { findByRole } = renderButtons({
        selectedContact: mockContact as never,
        onLinkContact: mockOnLinkContact,
      });
      const linkButton = await findByRole("button", { name: "Link Contact" });

      await userEvent.click(linkButton as Element);

      expect(mockOnLinkContact).toHaveBeenCalled();
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
