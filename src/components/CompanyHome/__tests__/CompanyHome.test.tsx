import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockAccount, mockGetCompanies } from "@/testing";
import { CompanyHome } from "../CompanyHome";
import type { Company } from "@/services/copper/types";
import type { Props } from "../CompanyHome";

const renderCompanyHome = (props?: Partial<Props>) => render((
  <CompanyHome
    account={props?.account ?? mockAccount}
    companies={props?.companies ?? mockGetCompanies as Company[]}
  />
), { wrappers: { theme: true } });

describe("CompanyHome", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { queryByText } = renderCompanyHome();

    expect(queryByText(/Cossack Hetmanate/i)).toBeInTheDocument();
    expect(queryByText(/Zakarpattian Sich/i)).toBeInTheDocument();
    expect(queryByText(/Zaporizhian Host/i)).toBeInTheDocument();
  });

  test("render", async () => {
    const { queryByText } = renderCompanyHome({ companies: [] });

    expect(queryByText(/No companies found/i)).toBeInTheDocument();
  });
});
