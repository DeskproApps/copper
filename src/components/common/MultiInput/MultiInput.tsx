import { useMemo, useState, useEffect, useCallback } from "react";
import { map, size, isEmpty, filter } from "lodash";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { P5, Stack, IconButton } from "@deskpro/deskpro-ui";
import { Input } from "../Input";
import type { FC, MouseEvent, KeyboardEvent, ChangeEvent } from "react";
import type { InputProps } from "@deskpro/deskpro-ui";

type Props = {
  id: string;
  error: boolean;
  values: string[];
  validators?: Array<"email">;
  onChange: (emails: string[]) => void;
  inputProps?: Partial<InputProps>;
};

const enhancedValidator = (
  validators?: Props["validators"],
) => (
  value: string,
  values: string[],
): boolean => {
  if (isEmpty(value) || isEmpty(values)) {
    return false;
  }

  try {
    if (validators?.includes("email")) {
      z.string().email().parse(value);
    } else {
      z.string().parse(value);
    }

    return values.includes(value);
  } catch (e) {
    return true;
  }
};

const MultiInput: FC<Props> = ({ id, values, onChange, error, inputProps, validators }) => {
  const [stringValue, setStringValue] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const validator = useMemo(() => enhancedValidator(validators || []), [validators]);

  const onChangeValue  = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStringValue(e.target.value);
  }, []);

  const onAddValue = useCallback((e: MouseEvent|KeyboardEvent) => {
    e.preventDefault();
    const newEmail = stringValue.trim();

    if (newEmail && !isError) {
      onChange([...(Array.isArray(values) ? values : []), newEmail]);
      setStringValue("");
    }
  }, [isError, onChange, values, stringValue]);

  const onRemoveValue = useDebouncedCallback((removeEmail: string) => {
    onChange(filter(values, (email) => email != removeEmail));
  }, 100);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddValue(e)
    }
  }, [onAddValue]);

  useEffect(() => {
    setIsError(validator(stringValue, values));
  }, [stringValue, values, validator]);

  return (
    <>
      {Array.isArray(values) && Boolean(size(values)) && (
        map(values, (v, index) => Boolean(v) && ((
          <Stack key={index} align="center">
            <P5>{v}</P5>
            <IconButton
              minimal
              icon={faTimes}
              color="grey40"
              onClick={() => onRemoveValue(v)}
            />
          </Stack>
        ))))
      }
      <Input
        {...inputProps}
        id={id}
        name={id}
        value={stringValue}
        error={error || isError}
        onChange={onChangeValue}
        onKeyDown={onKeyDown}
        style={{ paddingRight: 0 }}
        rightIcon={
          <IconButton
            minimal
            icon={faPlus}
            color="grey40"
            onClick={onAddValue}
          />
        }
      />
    </>
  );
};

export { MultiInput };
