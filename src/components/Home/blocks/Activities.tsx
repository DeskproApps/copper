import { size } from "lodash";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "../../../utils";
import { NoFound } from "../../common";
import { Activity } from "./Activity";
import type { FC } from "react";
import type { IActivity, IActivityType } from "../../../api/types";

export type Props = {
  activities: IActivity[];
  activityTypes: IActivityType[];
};

const Activities: FC<Props> = ({ activities, activityTypes }) => (
  <>
    <Title title={`Activities (${size(activities)})`} marginBottom={0}/>
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
