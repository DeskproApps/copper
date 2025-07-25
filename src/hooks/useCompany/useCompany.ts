import { CopperError, getCompany, getCompanyActivities, getPersonById, getUserById } from "@/services/copper";
import { useQueryWithClient } from "@deskpro/app-sdk";

export default function useCompany(companyId: string) {

  const companyResponse = useQueryWithClient(
    ["company", companyId],
    (client) => {
      try {
        return getCompany(client, companyId)
      }
      catch (e) {
        if (e instanceof CopperError && e.status === 404) {
          return Promise.resolve(null)
        }
        // Pass the error to the error boundary
        throw e
      }
    }
  )
  const companyActivitiesResponse = useQueryWithClient(
    ["company_activities", companyId, companyResponse.data?.id.toString() ?? ""],
    (client) => {
      return getCompanyActivities(client, companyId)
    },
    {
      enabled: !companyResponse.isLoading && Boolean(companyResponse.data)
    }
  )

  const assigneeResponse = useQueryWithClient(
    ["company_assignee", companyId, companyResponse.data?.assignee_id?.toString() ?? ""],
    (client) => {
      try {
        return getUserById(client, companyResponse.data?.assignee_id?.toString() ?? "")
      } catch (e) {
        if (e instanceof CopperError && e.status === 404) {
          return Promise.resolve(null)
        }
        // Pass the error to the error boundary
        throw e
      }
    },
    {
      enabled: Boolean(companyResponse.data?.assignee_id)
    }
  )

  const primaryContactResponse = useQueryWithClient(
    ["company_primary_contact", companyId, companyResponse.data?.primary_contact_id?.toString() ?? ""],
    (client) => {
      try {
        return getPersonById(client, companyResponse.data?.primary_contact_id?.toString() ?? "")
      } catch (e) {
        if (e instanceof CopperError && e.status === 404) {
          return Promise.resolve(null)
        }
        // Pass the error to the error boundary
        throw e
      }
    },
    {
      enabled: Boolean(companyResponse.data?.primary_contact_id)
    }
  )

  const companyIsLoading = companyResponse.isLoading
  const companyActivitiesIsLoading = !companyIsLoading && Boolean(companyResponse.data) && companyActivitiesResponse.isLoading
  const primaryContactIsLoading = Boolean(companyResponse.data?.primary_contact_id) && primaryContactResponse.isLoading
  const assigneeIsLoading = Boolean(companyResponse.data?.assignee_id) && assigneeResponse.isLoading

  return {
    isLoading: companyIsLoading || primaryContactIsLoading || assigneeIsLoading || companyActivitiesIsLoading,
    company: companyResponse.data ?? null,
    activities: companyActivitiesResponse.data?? [],
    assignee: assigneeResponse.data ?? null,
    primaryContact: primaryContactResponse.data ?? null,
  }
}