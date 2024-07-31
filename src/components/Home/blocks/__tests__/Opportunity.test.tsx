import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockSearchOpportunities } from "@/testing";
import { Opportunity } from "../Opportunity";
import type { Props } from "../Opportunity";

const renderOpportunity = (props?: Partial<Props>) => render((
  <Opportunity
    opportunity={props?.opportunity || mockSearchOpportunities[0] as never}
  />
), { wrappers: { theme: true, router: true } });

describe("Home", () => {
  describe("Opportunity", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderOpportunity();

      expect(await findByText(/New Demo Opportunity/i)).toBeInTheDocument();
      expect(await findByText(/Stage 1/i)).toBeInTheDocument();
      expect(await findByText(/\$100,500.00/i)).toBeInTheDocument();
      expect(await findByText(/Kyivan Rus/i)).toBeInTheDocument();
      expect(await findByText(/31 May 2024/i)).toBeInTheDocument();
    });
  });
});
