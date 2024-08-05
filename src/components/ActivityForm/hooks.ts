import { useMemo } from "react";
import { get } from "lodash-es";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getActivityTypesService } from "@/services/copper";
import { QueryKey } from "@/query";
import { getActivityTypeOptions } from "./utils";
import type { Option } from "@/types";
import type { ActivityType } from "@/services/copper/types";

type UseFormDeps = () => {
  isLoading: boolean;
  activityTypeOptions: Array<Option<ActivityType<"user">["id"]>>;
};

const useFormDeps: UseFormDeps = () => {
  const activityTypes = useQueryWithClient(
    [QueryKey.ACTIVITY_TYPES],
    getActivityTypesService,
  );

  return {
    isLoading: [activityTypes].some(({ isLoading }) => isLoading),
    activityTypeOptions: useMemo(() => {
      return getActivityTypeOptions(get(activityTypes.data, ["user"]));
    }, [activityTypes.data]),
  };
};

export { useFormDeps };
