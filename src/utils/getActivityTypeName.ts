import { get, find } from "lodash";
import { UserActivityType, Activity } from "@/services/copper/types";

const getActivityTypeName = (activity: Activity, types: UserActivityType[]): string => {
  const type = find(types, { id: get(activity, ["type", "id"]) });

  return type?.name || "-";
};

export { getActivityTypeName };
