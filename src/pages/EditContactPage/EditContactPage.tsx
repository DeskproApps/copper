import { EditContact } from "@/components";
import { getContactValues } from "@/components/ContactForm";
import { getError } from "@/utils";
import { LoadingSpinner, useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { Settings, UserData, type Maybe } from "@/types";
import { updateContactService } from "@/services/copper";
import { useContact, useRegisterElements } from "@/hooks";
import { useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { FC } from "react";
import type { FormValidationSchema } from "@/components/ContactForm";

const EditContactPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const contactId = useMemo(() => !id ? null : parseInt(id), [id]);
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<UserData, Settings>()
  const [error, setError] = useState<Maybe<string | string[]>>(null);
  const { isLoading, contact } = useContact(contactId);
  const dpUserId = context?.data?.user?.id

  const onCancel = useCallback(() => navigate(`/home`), [navigate]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !dpUserId || !contactId) {
      return Promise.resolve();
    }

    return updateContactService(client, contactId, getContactValues(data))
      .then(() => navigate("/home"))
      .catch((err) => setError(getError(err)));
  }, [client, dpUserId, contactId, navigate]);

  useRegisterElements();

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <EditContact
      error={error}
      contact={contact}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { EditContactPage };
