import { useMemo } from "react";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getContactTypesService } from "../../services/copper";
import { getOptions } from "../../utils";
import { QueryKey } from "../../query";
import type { Option } from "../../types";
import type { ContactType } from "../../services/copper/types";

type UseFormDeps = () => {
  isLoading: boolean,
  contactTypeOptions: Array<Option<ContactType["id"]>>;
};

const useFormDeps: UseFormDeps = () => {
  const contactTypes = useQueryWithClient([QueryKey.CONTACT_TYPES], getContactTypesService);

  return {
    isLoading: [contactTypes].some(({ isLoading }) => isLoading),
    contactTypeOptions: useMemo(() => getOptions(contactTypes.data), [contactTypes.data]),
  };
};

export { useFormDeps };
