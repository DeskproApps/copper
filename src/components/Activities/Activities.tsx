import { Fragment } from "react";
import { P5, Stack, Spinner } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { isLast } from "@/utils";
import { NotFound, ButtonAsLink } from "@/components/common";
import { Activity } from "./Activity";
import type { FC } from "react";
import type { Activity as ActivityType, UserActivityType } from "@/services/copper/types";

export type Props = {
  activities: ActivityType[];
  isLoading: boolean;
  activityTypes: UserActivityType[];
  onNextActivitiesPage: () => void;
  onNavigateToCreateActivity?: () => void;
};

const Activities: FC<Props> = ({
  isLoading,
  activities,
  activityTypes,
  onNextActivitiesPage,
  onNavigateToCreateActivity,
}) => {
  return (
    <>
      <Title
        title={`Activities (${activities.length || 0})`}
        {...(onNavigateToCreateActivity ? { onClick: onNavigateToCreateActivity } : {})}
        {...(activities?.length ? { marginBottom: 0 } : {})}
      />
      {(activities?.length === 0)
        ? <NotFound text="No activities found"/>
        : (
          <>
            {activities.map((activity, idx) => (
              <Fragment key={activity.id}>
                <Activity
                  key={activity.id}
                  activity={activity}
                  activityTypes={activityTypes}
                />
                {!isLast(activities, idx) && <HorizontalDivider/>}
              </Fragment>
            ))}
            <Stack justify="center" style={{ visibility: isLoading ? "visible" : "hidden" }}>
              <Spinner size="small"/>
            </Stack>
            <P5>
              <ButtonAsLink onClick={onNextActivitiesPage}>
                Load next 10 activities
              </ButtonAsLink>
            </P5>
          </>
        )
      }
    </>
  );
};

export { Activities };
