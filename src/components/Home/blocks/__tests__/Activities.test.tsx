import { cleanup } from "@testing-library/react";
import { render, mockActivities, mockActivityTypes } from "../../../../../testing";
import { Activities } from "../Activities";
import type { Props } from "../Activities";

const mockActivityList = [
  mockActivities[0],
  mockActivities[1],
  mockActivities[4],
];

const renderActivities = (props?: Partial<Props>) => render((
  <Activities
    activities={props?.activities || mockActivityList as never[]}
    activityTypes={props?.activityTypes || mockActivityTypes.user as never[]}
  />
));

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
  });
});
