import { get } from "lodash";
import { z } from "zod";
import type { Contact, OpportunityInput } from "../../services/copper/types";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  contact: z.string().min(1),
  name: z.string().min(1),
  pipeline: z.number(),
  stage: z.number(),
});

const getInitValues = (contact: Maybe<Contact>): FormValidationSchema => {
  return {
    name: "",
    contact: get(contact, ["name"]) || "",
    pipeline: 0,
    stage: 0,
  };
};

const getValues = (data: FormValidationSchema, contact: Contact): OpportunityInput => {
  return {
    name: data.name,
    primary_contact_id: contact.id,
    pipeline_id: data.pipeline || undefined,
    pipeline_stage_id: data.stage || undefined,
  };
};

export { validationSchema, getInitValues, getValues };
