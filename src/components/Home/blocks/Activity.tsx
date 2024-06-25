import { HorizontalDivider, Property, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { getActivityTypeName } from "../../../utils";
import { DPNormalize } from "../../common";
import type { FC } from "react";
import type { Activity, UserActivityType } from "../../../services/copper/types";

export type Props = {
  activity: Activity;
  isLast: boolean;
  activityTypes: UserActivityType[];
};

const Activity: FC<Props> = ({ activity, isLast, activityTypes }) => (
  <>
    <br/>
    <TwoProperties
      leftLabel={"Type"}
      leftText={getActivityTypeName(activity, activityTypes)}
      rightLabel="Date"
      rightText={format(activity.activity_date, { time: true })}
    />
    <Property text={<DPNormalize text={activity.details} />}/>
    {!isLast && <HorizontalDivider/>}
  </>
);

export { Activity };
