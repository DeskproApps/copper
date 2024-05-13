import { get } from "lodash";
import { Link as RouterLink } from "react-router-dom";
import { Link, Title, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { formatPrice } from "../../../utils";
import type { FC } from "react";
import type { IOpportunity } from "../../../api/types";

export type Props = { opportunity: IOpportunity };

const Opportunity: FC<Props> = ({ opportunity }) => (
  <>
    <Title
      title={(
        <Link as={RouterLink} to={`/opportunity/${opportunity?.id}`}>
          {get(opportunity, ["name"])}
        </Link>
      )}
    />
    <TwoProperties
      leftLabel="Stage"
      leftText={get(opportunity, ["pipeline_stage_name"])}
      rightLabel="Value"
      rightText={formatPrice(opportunity?.monetary_value, opportunity?.monetary_unit)}
    />
    <TwoProperties
      leftLabel="Owner"
      leftText={get(opportunity, ["assignee_name"])}
      rightLabel="Close date"
      rightText={format(get(opportunity, ["close_date"]))}
    />
  </>
);

export { Opportunity };
