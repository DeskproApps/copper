import { lightTheme, ThemeProvider } from "@deskpro/deskpro-ui";
import { cleanup, render, waitFor } from "@testing-library/react/";
import React from "react";
import { Main } from "../../src/pages/Main";

const renderPage = () => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <Main />
    </ThemeProvider>
  );
};

jest.mock("../../src/api/api", () => {
  return {
    getContactsByEmail: () => ({
      id: 1,
      emails: [
        {
          email: "a@b.com",
          category: "work",
        },
      ],
      phone_numbers: [
        {
          number: "123456789",
          category: "work",
        },
      ],
      title: "Developer",
      assignee_name: "Doe",
      company_name: "Ferrari",
      address: {
        street: "Street",
        city: "City",
        state: "State",
        postal_code: "123456",
      },
      shipping: {},
    }),
    getActivitiesByContactId: () => ({
      activities: [
        {
          currency: "123123123123",
          details: "sms",
        },
      ],
      notes: [
        {
          currency: "123123123123",
          details: "this is a note",
        },
      ],
    }),
    getOpportunitiesByContactId: () => [
      {
        pipeline_stage_name: "Pipeline test",
        monetary_value: 1,
        monetary_unit: "USD",
        assignee_name: "John Doe",
        close_date: "2021-10-10",
      },
    ],
    getAccount: () => ({
      id: 1,
    }),
  };
});

describe("Main", () => {
  test("Main page should show all data correctly", async () => {
    const { getByText } = renderPage();

    const title = await waitFor(() => getByText(/Developer/i));

    const totalSpent = await waitFor(() => getByText(/\$1.00/i));

    const email = await waitFor(() => getByText(/a@b.com/i));

    const companyName = await waitFor(() => getByText(/Ferrari/i));

    const note = await waitFor(() => getByText(/this is a note/i));

    const pipelineStateName = await waitFor(() => getByText(/Pipeline test/i));

    await waitFor(() => {
      [title, totalSpent, email, companyName, note, pipelineStateName].forEach(
        (el) => {
          expect(el).toBeInTheDocument();
        }
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();

    cleanup();
  });
});
