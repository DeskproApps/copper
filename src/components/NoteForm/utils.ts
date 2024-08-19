import { z } from "zod";
import type { ActivityInput } from "@/services/copper/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  note: z.string().min(1),
});

const getInitValues = (): FormValidationSchema => {
  return {
    note: "",
  };
};

const getValues = (data: FormValidationSchema): ActivityInput => {
  return {
    type: { category: "user", id: 0 }, // zero is activity type - note
    details: data.note || "",
  };
};

export { validationSchema, getInitValues, getValues };
