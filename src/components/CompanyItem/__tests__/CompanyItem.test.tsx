import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockAccount, mockSearchCompanies } from "@/testing";
import { CompanyItem } from "../CompanyItem";
import type { Account, Company } from "@/services/copper/types";
import type { Props } from "../CompanyItem";

const mockCompany = mockSearchCompanies[0] as Company;

const renderCompanyItem = (props?: Partial<Props>) => render((
  <CompanyItem
    account={props?.account || mockAccount as Account}
    company={props?.company || mockCompany}
    onClickTitle={props?.onClickTitle || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("CompanyItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { queryByText } = renderCompanyItem();

    expect(queryByText(/Cossack Hetmanate/i)).toBeInTheDocument();
    expect(queryByText(/https:\/\/cossackhetmanate.ua/i)).toBeInTheDocument();
    expect(queryByText(/2 Mazepa Street, Baturyn, Chernihiv Oblast, 16501, Ukraine/i)).toBeInTheDocument();
  });
});
