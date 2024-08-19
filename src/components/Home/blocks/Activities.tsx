import { size } from "lodash-es";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "@/utils";
import { NoFound } from "@/components/common";
import { Activity } from "./Activity";
import type { FC } from "react";
import type { Activity as ActivityType, UserActivityType } from "@/services/copper/types";

export type Props = {
  activities: ActivityType[];
  activityTypes: UserActivityType[];
  onNavigateToCreateActivity: () => void;
};

const Activities: FC<Props> = ({
  activities,
  activityTypes,
  onNavigateToCreateActivity,
}) => (
  <>
    <Title
      title={`Activities (${size(activities)})`}
      onClick={onNavigateToCreateActivity}
      {...(!size(activities) ? {} : { marginBottom: 0 })}
    />
    {!size(activities)
      ? <NoFound text="No activities found"/>
      : activities.map((activity, idx) => (
        <Activity
          key={activity.id}
          activity={activity}
          isLast={isLast(activities, idx)}
          activityTypes={activityTypes}
        />
      ))
    }
  </>
);

export { Activities };
