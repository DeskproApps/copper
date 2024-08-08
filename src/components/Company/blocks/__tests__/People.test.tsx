import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@deskpro/app-testing-utils";
import { mockAccount, mockPeople } from "@/testing";
import { People } from "../People";
import { Account, Contact } from "@/services/copper/types";
import type { Props } from "../People";

const renderPeople = (props?: Partial<Props>) => render((
  <People
    people={props?.people ?? mockPeople as Contact[]}
    account={props?.account ?? mockAccount as Account}
    isLoading={props?.isLoading ?? false}
    onNextPeoplePage={props?.onNextPeoplePage ?? jest.fn()}
  />
), { wrappers: { theme: true } });

describe("Company", () => {
  describe("People", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", () => {
      const { queryByText } = renderPeople();

      expect(queryByText(/Bohdan Khmelnytsky/i)).toBeInTheDocument();
      expect(queryByText(/bohdan.khmelnytsky@cossacks\.org/i)).toBeInTheDocument();
      expect(queryByText(/Ivan Mazepa/i)).toBeInTheDocument();
      expect(queryByText(/ivan.mazepa@cossacks.org/i)).toBeInTheDocument();
      expect(queryByText(/Ivan Sirko/i)).toBeInTheDocument();
      expect(queryByText(/ivan.sirko@zaporizhian.org/i)).toBeInTheDocument();
    });

    test("should trigger \"load next 10 people\"", async () => {
      const mockOnLoad = jest.fn();
      const { findByRole } = renderPeople({ onNextPeoplePage: mockOnLoad });

      const loadButton = await findByRole("button", { name: "Load next 10 people" });
      await userEvent.click(loadButton as Element);

      expect(mockOnLoad).toHaveBeenCalled();
    });
  });
});
