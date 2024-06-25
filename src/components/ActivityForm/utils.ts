import { toLower, isEmpty } from "lodash";
import { z } from "zod";
import { getOptions } from "../../utils";
import type { UserActivityType, ActivityInput } from "../../services/copper/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  type: z.number(),
  date: z.date().optional(),
  note: z.string().min(1),
});

const getInitValues = (): FormValidationSchema => {
  return {
    note: "",
    type: 0,
    date: undefined,
  };
};

const getValues = (data: FormValidationSchema): ActivityInput => {
  return {
    type: { category: "user", id: data.type },
    details: data.note || "",
    ...(!data.date?.getTime ? {} : { activity_date: data.date?.getTime() / 1000 }),
  };
};

const getActivityTypeOptions = (activities?: UserActivityType[]) => {
  if (!Array.isArray(activities) || isEmpty(activities)) {
    return [];
  }

  const items = activities.filter(({ name }) => {
    return toLower(name).includes("sms")
      || toLower(name).includes("call")
      || toLower(name).includes("meeting")
  });

  return getOptions(items);
};

export {
  getValues,
  getInitValues,
  validationSchema,
  getActivityTypeOptions,
};
