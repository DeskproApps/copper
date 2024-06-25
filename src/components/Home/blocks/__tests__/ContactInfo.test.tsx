import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockAccount, mockContact } from "../../../../../testing";
import { ContactInfo } from "../ContactInfo";
import type { Props } from "../ContactInfo";

const renderContactInfo = (props?: Partial<Props>) => render((
  <ContactInfo
    contact={props?.contact || mockContact as never}
    account={props?.account || mockAccount as never}
  />
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("ContactInfo", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderContactInfo();

      expect(await findByText(/Ivan Mazepa/i)).toBeInTheDocument();
      expect(await findByText(/ivan\.mazepa@cossacks\.org/i)).toBeInTheDocument();
      expect(await findByText(/\+123-456-7891/i)).toBeInTheDocument();
      expect(await findByText(/The Hetman/i)).toBeInTheDocument();
      expect(await findByText(/Kyivan Rus/i)).toBeInTheDocument();
      expect(await findByText(/Cossack Hetmanate/i)).toBeInTheDocument();
      expect(await findByText(/1 Volodymyrska Street, Kyiv, Kyiv City, 01001, Ukraine/i)).toBeInTheDocument();
    });
  });
});
