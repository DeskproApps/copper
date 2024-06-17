import { has } from "lodash";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@deskpro/deskpro-ui";
import { Select, LoadingSpinner } from "@deskpro/app-sdk";
import { getInitValues, validationSchema } from "./utils";
import { useFormDeps } from "./hooks";
import { Input, Label, Button, ErrorBlock } from "../common";
import type { FC } from "react";
import type { ContactType } from "../../services/copper/types";
import type { Props, FormValidationSchema } from "./types";

const ContactForm: FC<Props> = ({ error, onSubmit, onCancel, isEditMode, contact }) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(contact),
    resolver: zodResolver(validationSchema),
  });
  const { isLoading, contactTypeOptions } = useFormDeps();

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

      <Label htmlFor="" label="First Name" required>
        <Input
          id="firstName"
          error={has(errors, ["firstName", "message"])}
          {...register("firstName")}
        />
      </Label>

      <Label htmlFor="lastName" label="Last name" required>
        <Input
          id="lastName"
          error={has(errors, ["lastName", "message"])}
          {...register("lastName")}
        />
      </Label>

      <Label htmlFor="contactType" label="Contact Type">
        <Select
          id="contactType"
          options={contactTypeOptions}
          initValue={watch("contactType")}
          error={has(errors, ["contactType", "message"])}
          onChange={(value) => setValue("contactType", value as ContactType["id"])}
        />
      </Label>

      <Label htmlFor="email" label="Email">
        <Input
          id="email"
          error={has(errors, ["email", "message"])}
          {...register("email")}
        />
      </Label>

      <Label htmlFor="phone" label="Phone">
        <Input
          id="phone"
          error={has(errors, ["phone", "message"])}
          {...register("phone")}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text={isEditMode ? "Save" : "Create"}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        <Button
          type="button"
          text="Cancel"
          intent="tertiary"
          onClick={onCancel}
        />
      </Stack>
    </form>
  );
};

export {ContactForm};
