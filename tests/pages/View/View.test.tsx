import { lightTheme, ThemeProvider } from "@deskpro/deskpro-ui";
import { cleanup, render, waitFor } from "@testing-library/react/";
import React from "react";
import { View } from "../../../src/pages/View/View";

const renderPage = () => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <View />
    </ThemeProvider>
  );
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
  useParams: () => ({
    id: 1,
    type: "opportunity",
  }),
}));

jest.mock("../../../src/api/api", () => {
  return {
    getOpportunityById: () => ({
      pipeline_stage_name: "Pipeline stage test",
      pipeline_name: "Pipeline test",
      status: "open",
      priority: "high",
      monetary_value: 1,
      monetary_unit: "USD",
      assignee_name: "John Doe",
      close_date: "2021-10-10",
      details: "these are details",
    }),
  };
});

describe("Main", () => {
  test("Main page should show all data correctly", async () => {
    const { getByText } = renderPage();

    const pipelineStage = await waitFor(() =>
      getByText(/Pipeline stage test/i)
    );

    const status = await waitFor(() => getByText(/open/i));

    const details = await waitFor(() => getByText(/these are details/i));

    await waitFor(() => {
      [pipelineStage, status, details].forEach((el) => {
        expect(el).toBeInTheDocument();
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();

    cleanup();
  });
});
