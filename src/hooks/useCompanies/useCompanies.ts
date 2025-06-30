import { QueryKey } from "@/query"
import { getAccountService, getCompanies } from "@/services/copper"
import { setEntity } from "@/services/deskpro"
import { UserData } from "@/types"
import { useDeskproAppClient, useDeskproLatestAppContext, useQueryWithClient } from "@deskpro/app-sdk"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

interface UseCompaniesParams {
  searchQuery: string
  selectedCompanyId: string | null
}

export default function useCompanies(params: Readonly<UseCompaniesParams>) {
  const { searchQuery, selectedCompanyId } = params

  const { context } = useDeskproLatestAppContext<UserData, unknown>()
  const { client } = useDeskproAppClient()
  const navigate = useNavigate()

  const [isLinking, setIsLinking] = useState<boolean>(false)
  const isValidSearchQuery = searchQuery.trim() !== ""

  const accountResponse = useQueryWithClient([QueryKey.ACCOUNT], getAccountService);

  const companiesResponse = useQueryWithClient(
    ["companies", searchQuery],
    (client) => {
      return getCompanies(client, { name: searchQuery })
    },
    {
      enabled: isValidSearchQuery
    }
  )

  const deskproOrganisation = context?.data?.organisation
  const linkCompany = useCallback(async () => {
    if (!client || !deskproOrganisation?.id || !selectedCompanyId) {
      return
    }

    setIsLinking(true)
    const activeCompany = companiesResponse.data?.find((company) => {
      return company.id.toString() === selectedCompanyId
    })

    if (!activeCompany) {
    setIsLinking(false)

      return
    }

    await setEntity(client, { type: "organisation", organisationId: deskproOrganisation.id, entityKey: selectedCompanyId })
    setIsLinking(false)
    navigate(`/companies/${selectedCompanyId}`)

  }, [client, companiesResponse.data, deskproOrganisation?.id, navigate, selectedCompanyId])

  return {
    isLoading: isValidSearchQuery && (companiesResponse.isLoading || accountResponse.isLoading),
    companies: companiesResponse.data ?? [],
    account: accountResponse.data,
    linkCompany,
    isLinking
  }
}