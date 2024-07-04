import { get, find, toLower, isPlainObject } from "lodash";
import type { Activity, UserActivityType } from "../services/copper/types";

const isActivity = (
  type: string,
) => (
  activity?: Activity,
  types?: UserActivityType[],
): activity is Activity  => {
  if (!isPlainObject(activity) || !Array.isArray(types)) {
    return false;
  }

  const meetingType = find(types, ({ name }) => toLower(name).includes(toLower(type)));
  const meetingTypeId = get(meetingType, ["id"]);

  return get(activity, ["type", "id"]) === meetingTypeId;
};

export { isActivity };
