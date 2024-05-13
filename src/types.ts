import type { To } from "react-router-dom";
import type { Context } from "@deskpro/app-sdk";

/** common */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

/** Unix timestamp 1715684105 */
export type Timestamp = number;

/** 5/31/2024 */
export type DateTime = string

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
