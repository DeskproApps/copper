import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockActivities, mockActivityTypes } from "../../../../../testing";
import { Activity } from "../Activity";
import type { Props } from "../Activity";

const mockActivity = mockActivities[0];

const renderActivity = (props?: Partial<Props>) => render((
  <Activity
    activity={props?.activity || mockActivity as never}
    isLast={props?.isLast || false}
    activityTypes={props?.activityTypes || mockActivityTypes.user as never[]}
  />
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("Activity", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderActivity();

      expect(await findByText(/SMS/i)).toBeInTheDocument();
      expect(await findByText(/14 May 2024/i)).toBeInTheDocument();
      expect(await findByText(/phone message in activity/i)).toBeInTheDocument();
    });
  });
});
