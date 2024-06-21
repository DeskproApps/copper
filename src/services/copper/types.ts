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

export type ContactType = {
  id: number;
  name: string;
};

export type OpportunityInput = {
  //..
};

export type Opportunity = {
  id: number;
  name: string;
  assignee_id: number;
  close_date: number;
  company_id: number;
  company_name: string;
  customer_source_id: null;
  details: string;
  loss_reason_id: null;
  pipeline_id: number;
  pipeline_stage_id: number;
  primary_contact_id: number;
  priority: string;
  status: string;
  tags: object[];
  interaction_count: number;
  monetary_unit: string;
  monetary_value: number;
  converted_unit: string;
  converted_value: string;
  win_probability: number;
  date_stage_changed: number;
  date_last_contacted: number;
  leads_converted_from: object[];
  date_lead_created: null;
  date_created: number;
  date_modified: number;
  custom_fields: object[];
};

export type PipeLineStage = {
  id: number;
  name: string;
  win_probability: null;
};

export type Pipeline = {
  id: number;
  name: string;
  stages: PipeLineStage[];
};
