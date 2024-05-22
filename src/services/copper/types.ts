import type { Maybe } from "../../types";

export type Response<T> = Promise<T>;

export type CopperAPIError = {
  //..
};

export type Account = {
  id: number;
  name: string;
  settings: {
    setting_team_permissions_enabled: boolean;
    setting_enable_leads: boolean;
  },
  primary_timezone: string;
}

export type Email = {
  email: string;
  category: string;
};

export type PhoneNumber = {
  number: string;
  category: string;
};

export type Website = {
  url: string;
  category: string;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: null;
}

export type Contact = {
  id: number;
  name: string;
  prefix: null;
  first_name: string;
  middle_name: null;
  last_name: string;
  suffix: null;
  address: Maybe<Address>;
  assignee_id: null;
  company_id: null;
  company_name: null;
  contact_type_id: number;
  details: null;
  emails: Email[];
  phone_numbers: PhoneNumber[];
  socials: unknown[];
  tags: unknown[];
  title: null;
  websites: Website[];
  custom_fields: {
    custom_field_definition_id: number;
    value: null;
  }[];
  date_created: number;
  date_modified: number;
  interaction_count: number;
};
