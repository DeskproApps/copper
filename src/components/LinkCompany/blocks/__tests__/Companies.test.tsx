import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockAccount, mockSearchCompanies } from "@/testing";
import { Companies } from "../Companies";
import type { Company, Account } from "@/services/copper/types";
import type { Props } from "../Companies";

const renderCompanies = (props?: Partial<Props>) => render((
  <Companies
    isLoading={props?.isLoading || false}
    companies={mockSearchCompanies as Company[]}
    account={props?.account || mockAccount as Account}
    selectedCompanies={props?.selectedCompanies || []}
    onChangeSelectedCompanies={props?.onChangeSelectedCompanies || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkCompany", () => {
  describe("Companies", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", () => {
      const { queryByText } = renderCompanies();

      expect(queryByText(/Cossack Hetmanate/i)).toBeInTheDocument();
    });
  });
});
