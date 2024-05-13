import { get, find } from "lodash";
import { IActivityType, IActivity } from "../api/types";

const getActivityTypeName = (activity: IActivity, types: IActivityType[]): string => {
  const type = find(types, { id: get(activity, ["type", "id"]) });

  return type?.name || "-";
};

export { getActivityTypeName };
