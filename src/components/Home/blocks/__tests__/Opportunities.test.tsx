import { cleanup } from "@testing-library/react";
import { render, mockSearchOpportunities } from "../../../../../testing";
import { Opportunities } from "../Opportunities";
import type { Props } from "../Opportunities";

const renderOpportunities = (props?: Partial<Props>) => render((
  <Opportunities
    opportunities={props?.opportunities || mockSearchOpportunities as never[]}
    onNavigateToCreateOpportunity={props?.onNavigateToCreateOpportunity || jest.fn}
  />
), { wrappers: { router: true } });


describe("Home", () => {
  describe("Opportunities", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderOpportunities();

      expect(await findByText(/Opportunities \(1\)/i)).toBeInTheDocument();
      expect(await findByText(/New Demo Opportunity/i)).toBeInTheDocument();
    });

    test("should show \"No found\"", async () => {
      const { findByText } = renderOpportunities({ opportunities: [] });

      expect(await findByText(/Opportunities \(0\)/i)).toBeInTheDocument();
      expect(await findByText(/No opportunities found/i)).toBeInTheDocument();
    });
  });
});
