import { has } from "lodash";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@deskpro/deskpro-ui";
import { Select, LoadingSpinner } from "@deskpro/app-sdk";
import { useFormDeps } from "./hooks";
import { getInitValues, validationSchema } from "./utils";
import { Input, Label, Button, ErrorBlock } from "../common";
import type { FC } from "react";
import type { Props } from "./types";
import type { Pipeline, PipeLineStage } from "../../services/copper/types";

const OpportunityForm: FC<Props> = ({ error, onSubmit, onCancel, contact }) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: getInitValues(contact),
    resolver: zodResolver(validationSchema),
  });
  const { isLoading, pipelineOptions, stageOptions } = useFormDeps(watch("pipeline"));

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

      <Label htmlFor="contact" label="Contact" required>
        <Input
          disabled
          id="contact"
          {...register("contact")}
        />
      </Label>

      <Label htmlFor="name" label="Name" required>
        <Input
          id="name"
          error={has(errors, ["name", "message"])}
          {...register("name")}
        />
      </Label>

      <Label htmlFor="pipeline" label="Pipeline">
        <Select<Pipeline["id"]>
          id="pipeline"
          options={pipelineOptions}
          initValue={watch("pipeline")}
          error={has(errors, ["pipeline", "message"])}
          onChange={(value) => setValue("pipeline", value as Pipeline["id"])}
        />
      </Label>

      <Label htmlFor="stage" label="Stage">
        <Select<PipeLineStage["id"]>
          id="stage"
          options={stageOptions}
          initValue={watch("stage")}
          error={has(errors, ["stage", "message"])}
          onChange={(value) => setValue("stage", value as PipeLineStage["id"])}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text="Create"
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

export { OpportunityForm };
