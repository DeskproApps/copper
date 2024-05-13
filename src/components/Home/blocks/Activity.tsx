import { HorizontalDivider, Property, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { getActivityTypeName } from "../../../utils";
import { DPNormalize } from "../../common";
import type { FC } from "react";
import type { IActivity, IActivityType } from "../../../api/types";

export type Props = {
  activity: IActivity;
  isLast: boolean;
  activityTypes: IActivityType[];
};

const Activity: FC<Props> = ({ activity, isLast, activityTypes }) => (
  <>
    <br/>
    <TwoProperties
      leftLabel={"Type"}
      leftText={getActivityTypeName(activity, activityTypes)}
      rightLabel="Date"
      rightText={format(activity.activity_date)}
    />
    <Property text={<DPNormalize text={activity.details} />}/>
    {!isLast && <HorizontalDivider/>}
  </>
);

export { Activity };
