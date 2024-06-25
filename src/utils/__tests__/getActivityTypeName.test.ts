import { getActivityTypeName } from "../getActivityTypeName";
import { mockActivityTypes, mockActivities } from "../../../testing";

const mockCallActivity = mockActivities[6];

describe("utils", () => {
  describe("getActivityTypeName", () => {
    test("should return activity type name", () => {
      expect(getActivityTypeName(mockCallActivity as never, mockActivityTypes.user as never))
        .toBe("Phone Call");
    });

    test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
      const result = getActivityTypeName(payload as never, mockActivityTypes.user as never);
      expect(result).toBe("-");
    });
  });
});
