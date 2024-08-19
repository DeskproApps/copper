import { has } from "lodash-es";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@deskpro/deskpro-ui";
import { Label, Button, TextArea, ErrorBlock } from "@/components/common";
import { getInitValues, validationSchema } from "./utils";
import type { FC } from "react";
import type { Props, FormValidationSchema } from "./types";

const NoteForm: FC<Props> = ({ onSubmit, onCancel, error }) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(),
    resolver: zodResolver(validationSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

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

export { NoteForm };
