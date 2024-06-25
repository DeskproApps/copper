import { isNumber, isString, split } from "lodash";
import { LOCALE } from "../../constants";
import type { Maybe, Timestamp, DateTime } from "../../types";

type Options = {
  date?: boolean;
  time?: boolean;
};

const dateOptions: Pick<Intl.DateTimeFormatOptions, "day"|"month"|"year"> = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};
const timeOptions: Pick<Intl.DateTimeFormatOptions, "hour"|"minute"> = {
  hour: "2-digit",
  minute: "2-digit",
};

const format = (
  rawDate: Maybe<Timestamp|DateTime>,
  options: Options = {},
): Maybe<string> => {
  let parsedDate: Maybe<Date> = null;

  if (Boolean(rawDate) && isNumber(rawDate)) {
    parsedDate = new Date(rawDate * 1000);
  }

  if (Boolean(rawDate) && isString(rawDate)) {
    const [day, month, year] = split(rawDate, "/");

    if (day && month && year) {
      parsedDate = new Date(rawDate);
    }
  }

  if (!parsedDate) {
    return;
  }

  const { date = true, time = false } = options;

  try {
    return (new Intl.DateTimeFormat(LOCALE, {
      ...(!date ? {} : dateOptions),
      ...(!time ? {} : timeOptions),
    })).format(parsedDate);
  } catch (e) {
    return;
  }
};

export { format };
