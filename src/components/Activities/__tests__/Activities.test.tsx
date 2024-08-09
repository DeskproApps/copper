import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@deskpro/app-testing-utils";
import { mockActivities, mockActivityTypes } from "@/testing";
import { Activities } from "../Activities";
import type { Props } from "../Activities";

const mockActivityList = [
  mockActivities[0],
  mockActivities[1],
  mockActivities[4],
];

const renderActivities = (props?: Partial<Props>) => render((
  <Activities
    isLoading={props?.isLoading || false}
    onNextActivitiesPage={props?.onNextActivitiesPage || jest.fn()}
    activities={props?.activities || mockActivityList as never[]}
    activityTypes={props?.activityTypes || mockActivityTypes.user as never[]}
    onNavigateToCreateActivity={props?.onNavigateToCreateActivity || jest.fn}
  />
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("Activities", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderActivities();

      expect(await findByText(/Activities \(3\)/i)).toBeInTheDocument();
      expect(await findByText(/phone message in activity/i)).toBeInTheDocument();
      expect(await findByText(/message from phone/i)).toBeInTheDocument();
      expect(await findByText(/meeting meeting meeting/i)).toBeInTheDocument();
    });

    test("should show \"No activities found\" if no activities", async () => {
      const { findByText } = renderActivities({ activities: [] });

      expect(await findByText(/Activities \(0\)/i)).toBeInTheDocument();
      expect(await findByText(/No activities found/i)).toBeInTheDocument();
    });

    test("should trigger \"load next 10 activities\"", async () => {
      const mockOnLoad = jest.fn();
      const { findByRole } = renderActivities({ onNextActivitiesPage: mockOnLoad });

      const loadButton = await findByRole("button", { name: "Load next 10 activities" });
      await userEvent.click(loadButton as Element);

      expect(mockOnLoad).toHaveBeenCalled();
    });
  });
});
