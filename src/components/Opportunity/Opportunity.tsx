import { get } from "lodash";
import { Title, Property } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { formatPrice } from "../../utils";
import { Container, DPNormalize } from "../common";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Opportunity as OpportunityType } from "../../services/copper/types";

export type Props = {
  opportunity: Maybe<OpportunityType>;
};

const Opportunity: FC<Props> = ({ opportunity }) => {
  return (
    <Container>
      {get(opportunity, ["name"]) && <Title title={get(opportunity, ["name"])}/>}
      <Property label="Pipeline" text={get(opportunity, ["pipeline_name"])}/>
      <Property label="Stage" text={get(opportunity, ["pipeline_stage_name"])}/>
      <Property
        label="Value"
        text={formatPrice(opportunity?.monetary_value, opportunity?.monetary_unit)}
      />
      <Property label="Close date" text={format(get(opportunity, ["close_date"]))}/>
      <Property label="Owner" text={get(opportunity, ["assignee_name"])}/>
      <Property label="Status" text={get(opportunity, ["status"])}/>
      <Property label="Priority" text={get(opportunity, ["priority"])}/>
      <Property label="Description" text={<DPNormalize text={get(opportunity, ["details"])}/>}/>
    </Container>
  );
};

export { Opportunity };
