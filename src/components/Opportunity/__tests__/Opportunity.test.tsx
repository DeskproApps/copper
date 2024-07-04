import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockOpportunity } from "../../../../testing";
import { Opportunity } from "../Opportunity";
import type { Props } from "../Opportunity";

const renderOpportunity = (props?: Partial<Props>) => render((
  <Opportunity
    opportunity={props?.opportunity || mockOpportunity as never}
  />
), { wrappers: { theme: true } });

describe("Opportunity", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderOpportunity();

    expect(await findByText(/New Demo Opportunity/i)).toBeInTheDocument();
    expect(await findByText(/Setup Your Pipeline/i)).toBeInTheDocument();
    expect(await findByText(/Stage 1/i)).toBeInTheDocument();
    expect(await findByText(/\$100,500\.00/i)).toBeInTheDocument();
    expect(await findByText(/31 May 2024/i)).toBeInTheDocument();
    expect(await findByText(/Kyivan Rus/i)).toBeInTheDocument();
    expect(await findByText(/Open/i)).toBeInTheDocument();
    expect(await findByText(/Low/i)).toBeInTheDocument();
    expect(await findByText(/this is description/i)).toBeInTheDocument();
  });
});
