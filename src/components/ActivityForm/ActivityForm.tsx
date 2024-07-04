import { has } from "lodash";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@deskpro/deskpro-ui";
import { Select, DateInput, LoadingSpinner } from "@deskpro/app-sdk";
import { useFormDeps } from "./hooks";
import { Label, Button, ErrorBlock, TextArea } from "../common";
import { getInitValues, validationSchema } from "./utils";
import type { FC } from "react";
import type { UserActivityType } from "../../services/copper/types";
import type { Props, FormValidationSchema } from "./types";

const ActivityForm: FC<Props> = ({ error, onSubmit, onCancel }) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(),
    resolver: zodResolver(validationSchema),
  });
  const { isLoading, activityTypeOptions } = useFormDeps();

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

      <Label htmlFor="type">
        <Select
          id="type"
          initValue={watch("type")}
          error={has(errors, ["type", "message"])}
          options={activityTypeOptions}
          onChange={(value) => setValue("type", value as UserActivityType["id"])}
        />
      </Label>

      <Label>
        <Label htmlFor="date" label="Date">
          <DateInput
            enableTime
            id="dueDate"
            placeholder="DD/MM/YYYY"
            value={watch("date") as Date}
            error={has(errors, ["date", "message"])}
            onChange={(date: [Date]) => setValue("date", date[0])}
          />
        </Label>
      </Label>

      <Label htmlFor="note" label="Note">
        <TextArea
          id="note"
          minHeight="auto"
          value={watch("note")}
          error={has(errors, ["note", "message"])}
          {...register("note")}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text="Add"
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

export { ActivityForm };
