import { isNote } from "../isNote";
import { mockActivities, mockActivityTypes } from "../../../testing";

const mockNote = mockActivities[5];
const mockActivity = mockActivities[1];

describe("utils", () => {
  describe("isNote", () => {
    test("should be note", () => {
      expect(isNote(mockNote as never, mockActivityTypes.user as never)).toBeTruthy();
    });

    test("shouldn't be note", () => {
      expect(isNote(mockActivity as never, mockActivityTypes.user as never)).toBeFalsy();
    });
  });
});
