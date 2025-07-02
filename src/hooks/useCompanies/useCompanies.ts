import { getCompanies } from "@/services/copper"
import { setEntity } from "@/services/deskpro"
import { useCallback, useState } from "react"
import { useDeskproAppClient, useDeskproLatestAppContext, useQueryWithClient } from "@deskpro/app-sdk"
import { useNavigate } from "react-router-dom"
import { UserData } from "@/types"

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
    isLoading: isValidSearchQuery && companiesResponse.isLoading,
    companies: companiesResponse.data ?? [],
    linkCompany,
    isLinking
  }
}