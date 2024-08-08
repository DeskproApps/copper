import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockAccount, mockCompany, mockContact } from "@/testing";
import { Details } from "../Details";
import type { Company, Contact } from "@/services/copper/types";
import type { Props } from "../Details";

const renderDetails = (props?: Partial<Props>) => render((
  <Details
    account={props?.account ?? mockAccount}
    company={props?.company ?? mockCompany as Company}
    primaryContact={props?.primaryContact ?? mockContact as Contact}
  />
), { wrappers: { theme: true } });

describe("Company", () => {
  describe("Details", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", () => {
      const { queryByText, queryAllByText } = renderDetails();

      expect(queryByText(/Cossack Hetmanate/i)).toBeInTheDocument();
      expect(queryByText(/https:\/\/cossackhetmanate.ua/i)).toBeInTheDocument();
      expect(queryAllByText(/cossackhetmanate.ua/i)).toHaveLength(2);
      expect(queryByText(/\+380441234568/i)).toBeInTheDocument();
      expect(queryByText(/2 Mazepa Street, Baturyn, Chernihiv Oblast, 16501, Ukraine/i)).toBeInTheDocument();
      expect(queryByText(/Ivan Mazepa/i)).toBeInTheDocument();
      expect(queryByText(/some some descr/i)).toBeInTheDocument();
    });
  });
});
