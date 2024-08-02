import type { Maybe, Timestamp } from "@/types";

export type Response<T> = Promise<T>;

export type CopperAPIError = {
  error?: string;
  message?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
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
  country: string;
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

export type OpportunityRelated = {
  id: number;
  type: "opportunity";
}

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

export type ActivityType<Category> = {
  id: number;
  name: string;
  category: Category;
  is_disabled: boolean;
  count_as_interaction: boolean;
};

export type UserActivityType = ActivityType<"user">;

export type SystemActivityType = ActivityType<"system">;

export type ActivityTypes = {
  system: Array<SystemActivityType>;
  user: Array<UserActivityType>;
};

export type ActivityInput = {
  type: {
    category: "user";
    id: UserActivityType["id"];
  },
  details: string;
  activity_date?: Timestamp;
};

export type Activity = {
  id: number;
  parent: {
    id: Contact["id"];
    type: "person"
  },
  type: {
    id: UserActivityType["id"];
    category: "user";
  },
  user_id: number;
  details: string;
  activity_date: Timestamp;
  old_value: null;
  new_value: null;
  date_created: Timestamp;
  date_modified: Timestamp;
};

export type Company = {
  id: number;
  name: string;
  address: Address;
  assignee_id: Contact["id"];
  contact_type_id: ContactType["id"];
  details: Maybe<string>;
  email_domain: string;
  phone_numbers: PhoneNumber[];
  primary_contact_id: Contact["id"];
  socials: [];
  tags: [];
  websites: Website[];
  custom_fields: [];
  interaction_count: number;
  date_created: Timestamp;
  date_modified: Timestamp;
};
