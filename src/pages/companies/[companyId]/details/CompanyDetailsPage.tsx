import { ActivitySection, CompanyPhoneNumbers, CompanyTags, NameWithLink } from "./components";
import { CopperLogo } from "@/components/common";
import { ExternalIconLink, HorizontalDivider, LoadingSpinner, Property, useDeskproAppTheme, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { H3, Stack } from "@deskpro/deskpro-ui";
import { Settings, UserData } from "@/types";
import { useParams } from "react-router-dom";
import Callout from "@/components/Callout";
import formatAddress from "@/utils/formatAddress";
import useAccount from "@/hooks/useAccount";
import useActivityTypes from "@/hooks/useActivityTypes";
import useCompany from "@/hooks/useCompany";

export default function CompanyDetailsPage(): JSX.Element {
  const { companyId } = useParams();
  const { theme } = useDeskproAppTheme()

  useInitialisedDeskproAppClient((client) => {
    client.setTitle("View Company")
  }, [])

  const { context } = useDeskproLatestAppContext<UserData, Settings>()
  const isUsingOAuth = context?.settings.use_api_key === false || context?.settings.use_advanced_connect === false;

  useDeskproElements(({ registerElement, clearElements, deRegisterElement }) => {
    clearElements()
    deRegisterElement("home")
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink Company",
        payload: { type: "unlink" },
      },
      ...(isUsingOAuth
        ? [
          {
            title: "Logout",
            payload: { type: "logout" },
          },
        ]
        : [])
      ],
    })

    registerElement("refresh", { type: "refresh_button" })
  }, [])

  const { isLoading, company, activities, primaryContact, assignee } = useCompany(companyId ?? "")
  const { account, isLoading: accountIsLoading } = useAccount()
  const { isLoading: isLoadingActivityTypes, activityTypes } = useActivityTypes()

  if (!companyId || !Number.isInteger(Number(companyId))) {
    return (
      <Stack padding={12}>
        <Callout accent="red" style={{ width: "100%" }}>
          Invalid url parameter: companyId.
        </Callout>
      </Stack>
    )
  }

  if (isLoading || accountIsLoading || isLoadingActivityTypes) {
    return (
      <Stack align="center" justify="center" style={{ width: "100%" }}>
        <LoadingSpinner />
      </Stack>
    )
  }

  if (!company) {
    return (
      <Stack padding={12} style={{ width: "100%" }}>
        <Callout accent="red" style={{ width: "100%" }}>
          No company found with the id "{companyId}".
        </Callout>
      </Stack>
    )
  }

  const hasCompanyTags = company.tags && company.tags.length > 0
  const hasPhoneNumbers = company.phone_numbers && company.phone_numbers.length > 0

  return (
    <Stack vertical style={{ width: "100%" }}>
      <Stack vertical gap={3} padding={12} style={{ width: "100%" }}>
        <Stack align="center" justify={"space-between"} style={{ width: "100%" }}>
          <H3>{company.name}</H3>

          <ExternalIconLink
            icon={<CopperLogo />}
            href={`https://app.copper.com/companies/${account?.id}/app#/browse/list/companies/default?fullProfile=companies-${company.id}`}
          />
        </Stack>

        <Property
          label={"Description"}
          text={company.details}
        />

        <Property
          label={"Email Domain"}
          text={company.email_domain}
        />
        <Property
          label={"Address"}
          text={formatAddress(company.address)}
        />
        <Property
          label={"Phone Numbers"}
          text={hasPhoneNumbers ?
            <CompanyPhoneNumbers
              numbers={company.phone_numbers}
            /> : undefined
          }
        />

        <Property
          label={"Assignee"}
          text={assignee?.name ?
            <NameWithLink
              name={assignee.name}
              link={`https://app.copper.com/companies/${account?.id}/app/#/company_user/${assignee.id}/`}
            /> : undefined}
        />

        <Property
          label={"Primary Contact"}
          text={primaryContact?.name ?
            <NameWithLink
              name={primaryContact.name}
              link={`https://app.copper.com/companies/${account?.id}/app#/browse/list/companies/default?fullProfile=people-${primaryContact.id}`}
            /> : undefined}
        />

        <Property
          label={"Tags"}
          text={hasCompanyTags ? <CompanyTags tags={company.tags} theme={theme} /> : undefined}
        />
      </Stack>
      <HorizontalDivider style={{ margin: 0, width: "100%" }} />

      <ActivitySection
        account={account}
        company={company}
        activities={activities}
        activityTypes={activityTypes} />
    </Stack>
  )
}