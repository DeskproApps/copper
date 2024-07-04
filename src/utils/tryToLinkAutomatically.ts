import { get, isEmpty } from "lodash";
import { setEntityService, getEntityListService } from "../services/deskpro";
import { getPersonByEmailService } from "../services/copper";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Maybe, DPUser } from "../types";
import type { Contact } from "../services/copper/types";

const tryToLinkAutomatically = async (
  client: IDeskproClient,
  dpUser: DPUser,
) => {
  const entityIds = await getEntityListService(client, dpUser?.id);
  let contactId: Maybe<Contact["id"]> = null;

  if (!isEmpty(entityIds)) {
    return;
  }

  const email = get(dpUser, ["primaryEmail"]);

  if (!email) {
    return;
  }

  try {
    const contacts = await getPersonByEmailService(client, email);
    contactId = get(contacts, ["id"]);
  } catch (e) {
    return;
  }

  if (!contactId) {
    return;
  }

  return setEntityService(client, dpUser.id, `${contactId}`);
};

export { tryToLinkAutomatically };
