import type { To, ParamKeyValuePair } from "react-router-dom";
import type { DropdownValueType } from "@deskpro/deskpro-ui";
import type { Context, IDeskproClient } from "@deskpro/app-sdk";
import type { Response } from "./services/copper/types";

/** common */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

/** Unix timestamp 1715684105 */
export type Timestamp = number;

/** 5/31/2024 */
export type DateTime = string

/** Request types */
export type ApiRequestMethod = "GET" | "POST" | "PUT";

export type RequestParams = {
  url?: string;
  rawUrl?: string;
  method?: ApiRequestMethod;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Dict<any>|RequestInit["body"];
  headers?: Dict<string>;
  queryParams?: string|Dict<string>|ParamKeyValuePair[];
  settings?: Settings;
};

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Response<T>;

/** Deskpro */
export type Settings = {
  api_key?: string;
  api_key_owner_email?: string;
};

export type DPUser = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  titlePrefix: string;
  isDisabled: boolean;
  isAgent: boolean;
  isConfirmed: boolean;
  emails: string[];
  primaryEmail: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields: Dict<any>;
  language: string;
  locale: string;
};

export type UserData = {
  user: DPUser;
};

export type UserContext = Context<UserData, Maybe<Settings>>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type UnlinkPayload = { type: "unlink" };

export type EventPayload =
  | NavigateToChangePage
  | UnlinkPayload
;
