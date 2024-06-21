import { get, map, trim } from "lodash";
import { z } from "zod";
import type { DPUser } from "../../types";
import type { Contact, PhoneNumber } from "../../services/copper/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  contactType: z.number(),
  emails: z.array(z.string().email()),
  phones: z.array(z.string()),
});

const getInitValues = (contact?: DPUser|Contact): FormValidationSchema => {
  return {
    firstName: get(contact, ["firstName"]) || get(contact, ["first_name"]) || "",
    lastName: get(contact, ["lastName"]) || get(contact, ["last_name"]) || "",
    emails: [
      get(contact, ["primaryEmail"]),
      ...(contact?.emails || []).map((email) => get(email, ["email"])).filter(Boolean),
    ].filter(Boolean),
    phones: (get(contact, ["phone_numbers"]) || [])
      .map((phone: PhoneNumber) => get(phone, ["number"]))
      .filter(Boolean),
    contactType: 0,
  };
};

const getContactValues = (data: FormValidationSchema) => {
  const emails = map(data.emails, (email) => ({ email: email, category: "work" }));
  const phones = map(data.phones, (phone) => ({ number: phone, category:"mobile" }));

  return {
    name: trim([
      get(data, ["firstName"]),
      get(data, ["lastName"]),
    ].filter(Boolean).join(" ")),
    contact_type_id: data.contactType || null,
    emails,
    phone_numbers: phones,
  };
};

export { validationSchema, getInitValues, getContactValues };
