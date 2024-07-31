import { get } from "lodash-es";
import { Link as RouterLink } from "react-router-dom";
import { Link, Title, TwoProperties } from "@deskpro/app-sdk";
import { format } from "@/utils/date";
import { formatPrice } from "@/utils";
import type { FC } from "react";
import type { Opportunity } from "@/services/copper/types";

export type Props = { opportunity: Opportunity };

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
      leftLabel="Pipeline"
      leftText={get(opportunity, ["pipeline_name"])}
      rightLabel="Stage"
      rightText={get(opportunity, ["pipeline_stage_name"])}
    />
    <TwoProperties
      leftLabel="Value"
      leftText={formatPrice(opportunity?.monetary_value, opportunity?.monetary_unit)}
      rightLabel="Close date"
      rightText={format(get(opportunity, ["close_date"]))}
    />
  </>
);

export { Opportunity };
