import { isSms } from "../isSms";
import { mockActivities, mockActivityTypes } from "../../../testing";

const mockPhoneCall = mockActivities[0];
const mockActivity = mockActivities[2];

describe("utils", () => {
  describe("isSms", () => {
    test("should be sms", () => {
      expect(isSms(mockPhoneCall as never, mockActivityTypes.user as never)).toBeTruthy();
    });

    test("shouldn't be sms", () => {
      expect(isSms(mockActivity as never, mockActivityTypes.user as never)).toBeFalsy();
    });
  });
});
