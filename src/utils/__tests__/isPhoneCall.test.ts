import { isPhoneCall } from "../isPhoneCall";
import { mockActivities, mockActivityTypes } from "../../../testing";

const mockPhoneCall = mockActivities[6];
const mockActivity = mockActivities[1];

describe("utils", () => {
  describe("isPhoneCall", () => {
    test("should be phone call", () => {
      expect(isPhoneCall(mockPhoneCall as never, mockActivityTypes.user as never)).toBeTruthy();
    });

    test("shouldn't be phone call", () => {
      expect(isPhoneCall(mockActivity as never, mockActivityTypes.user as never)).toBeFalsy();
    });
  });
});
