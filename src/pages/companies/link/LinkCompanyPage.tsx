import { Button, Stack } from "@deskpro/deskpro-ui";
import { CompanyList } from "./components";
import { HorizontalDivider, Search, useDeskproAppTheme, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { Settings, UserData } from "@/types";
import { useAccount, useCompanies } from "@/hooks";
import { useDebounce } from "use-debounce";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function LinkCompanyPage() {
  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Link Company")
  }, [])

  const { context } = useDeskproLatestAppContext<UserData, Settings>()
  const isUsingOAuth = context?.settings.use_api_key === false || context?.settings.use_advanced_connect === false;

  useDeskproElements(({ registerElement, clearElements, deRegisterElement }) => {
    clearElements()
    deRegisterElement("home")
    registerElement("refresh", { type: "refresh_button" })
    if (isUsingOAuth) {
      registerElement("menu", {
        type: "menu",
        items: [
          {
            title: "Logout",
            payload: { type: "logout" },
          }
        ],
      })
    }
  }, [])
  
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const defaultSearch = searchParams.get('filter')
  
  const { theme } = useDeskproAppTheme()
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
  
  const [searchQuery, setSearchQuery] = useState<string>(defaultSearch ?? "")
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  const { isLoading, companies, linkCompany, isLinking } = useCompanies({ searchQuery: debouncedSearchQuery, selectedCompanyId })
  const {account, isLoading: accountIsLoading} = useAccount()
  return (
    <Stack style={{ width: "100%" }} vertical>
      <Stack gap={6} padding={12} style={{ width: "100%" }} vertical>
        <div style={{ width: "100%" }}>
          <Search
            isFetching={isLoading}
            marginBottom={0}
            onChange={(search) => {
              setSearchQuery(search)
            }}
            inputProps={{
              placeholder: "Enter company name (exact match)",
              value: searchQuery
            }}
          />
        </div>

        <Button
          text={"Link Company"}
          disabled={!selectedCompanyId || isLoading || isLinking}
          onClick={linkCompany}
        />
      </Stack>

      <HorizontalDivider style={{ margin: 0, width: "100%" }} />

      <CompanyList
        isLoading={isLoading || accountIsLoading}
        theme={theme}
        isValidSearchQuery={debouncedSearchQuery.trim() !== ""}
        companies={companies}
        selectedCompanyId={selectedCompanyId}
        setSelectedCompanyId={setSelectedCompanyId}
        account={account}
      />


    </Stack>
  )
}