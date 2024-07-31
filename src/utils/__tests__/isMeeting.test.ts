import { isMeeting } from "../isMeeting";
import { mockActivities, mockActivityTypes } from "@/testing";

const mockMeeting = mockActivities[4];
const mockActivity = mockActivities[0];

describe("utils", () => {
  describe("isMeeting", () => {
    test("should be meeting", () => {
      expect(isMeeting(mockMeeting as never, mockActivityTypes.user as never)).toBeTruthy();
    });

    test("shouldn't be meeting", () => {
      expect(isMeeting(mockActivity as never, mockActivityTypes.user as never)).toBeFalsy();
    });

    test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
      expect(isMeeting(payload as never, payload as never)).toBeFalsy();
    });
  });
});
