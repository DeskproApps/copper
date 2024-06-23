import { z } from "zod";
import { validationSchema } from "./utils";
import type { SubmitHandler } from "react-hook-form";
import type { Maybe } from "../../types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type Props = {
  error?: Maybe<string|string[]>;
  onSubmit: SubmitHandler<FormValidationSchema>;
  onCancel?: () => void;
};
