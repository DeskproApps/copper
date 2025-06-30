import { Account, Company } from "@/services/copper/types";
import { Checkbox, DeskproTheme, P3, Stack } from "@deskpro/deskpro-ui";
import { CopperLogo } from "@/components/common";
import { Dispatch } from "react";
import { ExternalIconLink, LoadingSpinner } from "@deskpro/app-sdk";

interface CompanyListProps {
  companies: Company[]
  isLoading: boolean
  isValidSearchQuery: boolean
  theme: DeskproTheme
  account?: Account
  setSelectedCompanyId: Dispatch<React.SetStateAction<string | null>>
  selectedCompanyId: string | null
}

export function CompanyList(props: Readonly<CompanyListProps>) {
  const { companies, isLoading, theme, account, isValidSearchQuery, selectedCompanyId, setSelectedCompanyId } = props

  if (isLoading) {
    return (
      <Stack align="center" justify="center" style={{ width: "100%" }}>
        <LoadingSpinner />
      </Stack>
    )
  }

  if (!isValidSearchQuery) {
    return <></>
  }

  if (companies.length < 1) {
    return (
      <Stack padding={12} style={{ width: "100%" }}>
        <em style={{
          color: theme.colors.grey100,
          whiteSpace: "normal",
          wordBreak: "break-word",
          fontSize: "12px"
        }}>
          No company found matching the provided query.
        </em>
      </Stack>
    )
  }

  return (
    <Stack vertical padding={12} style={{ width: "100%" }}>
      {companies.map((company) => {
        const isSelectedCompany = selectedCompanyId === company.id.toString()
        return (
          <Stack gap={6} justify="space-between" style={{ width: "100%" }}>
            <Stack align="center" gap={6} style={{ minWidth: 0 }}>
              <Checkbox
                checked={isSelectedCompany}
                onClick={() => {
                  if (!isSelectedCompany) {
                    setSelectedCompanyId(company.id.toString())
                    return
                  }
                  setSelectedCompanyId(null)
                }}
              />

              <P3
                title={company.name}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flexShrink: 1,
                  minWidth: 0,
                }}
              >
                {company.name}
              </P3>
            </Stack>

            <div>
              <ExternalIconLink
                icon={<CopperLogo />}
                href={`https://app.copper.com/companies/${account?.id}/app#/browse/list/companies/default?fullProfile=companies-${company.id}`} />
            </div>
          </Stack>
        )
      })}
    </Stack>
  )


}