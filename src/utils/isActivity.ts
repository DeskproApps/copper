import { get, find, toLower, isPlainObject } from "lodash";
import type { IActivityType, IActivity } from "../api/types";

const isActivity = (
  type: string,
) => (
  activity?: IActivity,
  types?: IActivityType[],
): activity is IActivity  => {
  if (!isPlainObject(activity) || !Array.isArray(types)) {
    return false;
  }

  const meetingType = find(types, ({ name }) => toLower(name).includes(toLower(type)));
  const meetingTypeId = get(meetingType, ["id"]);

  return get(activity, ["type", "id"]) === meetingTypeId;
};

export { isActivity };
