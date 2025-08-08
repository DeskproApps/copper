import { Account, Activity, ActivityTypes, Company } from "@/services/copper/types";
import { CopperLogo } from "@/components/common";
import { ExternalIconLink, HorizontalDivider, Property, TwoProperties } from "@deskpro/app-sdk";
import { Fragment } from "react/jsx-runtime";
import { H3, Stack } from "@deskpro/deskpro-ui";

interface ActivitySectionProps {
  activities: Activity[]
  activityTypes: ActivityTypes | null
  account: Account | null
  company: Company
}
export function ActivitySection(props: Readonly<ActivitySectionProps>) {
  const { activities, activityTypes, account, company } = props

  return (
    <Stack vertical style={{ width: "100%" }}>
      <Stack padding={12} align="center" justify={"space-between"} style={{ width: "100%" }}>
        <H3>Activities ({activities.length})</H3>

        <ExternalIconLink
          icon={<CopperLogo />}
          href={`https://app.copper.com/companies/${account?.id}/app#/browse/list/companies/default?context=companies-${company.id}&preview=companies-${company.id}&tab=activity`}
        />
      </Stack>

      {activities.map((activity) => {
        const activityTypeName = getActivityTypeName(activity, activityTypes)
        return (
          <Fragment
            key={activity.id}
          >
            <Stack padding={12} vertical style={{ width: "100%" }}>
              <TwoProperties
                leftLabel="Type"
                leftText={activityTypeName}
                rightLabel="Date"
                rightText={new Date(activity.activity_date * 1000).toUTCString()}
              />
              <Property
                label="Note"
                text={activity.details ?? "N/A"}
              />
            </Stack>
            <HorizontalDivider style={{ width: "100%", margin: 0 }} />
          </Fragment>
        )
      })}
    </Stack>
  )
}

function getActivityTypeName(activity: Activity, activityTypes: ActivityTypes | null): string {
  if (activity.type?.name) {
    return activity.type.name
  }

  if (activity.type?.category === "user" && activityTypes) {
    const userType = activityTypes.user.find((t) => t.id === activity.type.id)
    if (userType) {
      return userType.name
    }
  }

  return "Unknown Type"
}