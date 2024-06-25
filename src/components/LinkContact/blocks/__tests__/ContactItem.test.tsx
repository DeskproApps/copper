import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockContact, mockAccount } from "../../../../../testing";
import { ContactItem } from "../ContactItem";
import type { Props } from "../ContactItem";

const renderContactItem = (props?: Partial<Props>) => render((
  <ContactItem
    account={props?.account || mockAccount as never}
    contact={props?.contact || mockContact as never}
    onClickTitle={props?.onClickTitle || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkContact", () => {
  describe("ContactItem", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderContactItem();

      expect(await findByText(/Ivan Mazepa/i)).toBeInTheDocument();
      expect(await findByText(/ivan.mazepa@cossacks.org/i)).toBeInTheDocument();
    });
  });
});
