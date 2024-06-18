import { trim, get } from "lodash";
import { z } from "zod";
import type { DPUser } from "../../types";
import type { Contact } from "../../services/copper/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.union([
    z.string().email(),
    z.literal(""),
  ]).optional(),
  phone: z.string(),
  contactType: z.number(),
});

const getInitValues = (contact?: DPUser|Contact) => {
  return {
    firstName: get(contact, ["firstName"]) || "",
    lastName: get(contact, ["lastName"]) || "",
    email: get(contact, ["primaryEmail"]) || "",
    phone: "",
    contactType: 0,
  };
};

const getContactValues = (data: FormValidationSchema) => {
  const email = !data.email ? [] : [{ email: data.email, category:"work" }];
  const phone = !data.phone? [] : [{ number: data.phone, category:"work" }];

  return {
    name: trim([
      get(data, ["firstName"]),
      get(data, ["lastName"]),
    ].filter(Boolean).join(" ")),
    contact_type_id: data.contactType || null,
    emails: email,
    phone_numbers: phone,
  };
};

export { validationSchema, getInitValues, getContactValues };
