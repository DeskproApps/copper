import { getActivityTypesService } from "@/services/copper";
import { QueryKey } from "@/query";
import { useQueryWithClient } from "@deskpro/app-sdk";

export default function useActivityTypes() {
  const activityTypesResponse = useQueryWithClient([QueryKey.ACTIVITY_TYPES], getActivityTypesService)

  return {
    activityTypes: activityTypesResponse.data ?? null,
    isLoading: activityTypesResponse.isLoading
  }

}