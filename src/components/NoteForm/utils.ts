import { z } from "zod";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  note: z.string().min(1),
});

const getInitValues = (): FormValidationSchema => {
  return {
    note: "",
  };
};

const getValues = (data: FormValidationSchema) => {
  return {
    note: data.note || "",
  };
};

export { validationSchema, getInitValues, getValues };
