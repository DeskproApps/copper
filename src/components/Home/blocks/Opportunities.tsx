import { size } from "lodash";
import { Title } from "@deskpro/app-sdk";
import { NoFound } from "../../common";
import { Opportunity } from "./Opportunity";
import type { FC } from "react";
import type { Opportunity as OpportunityType } from "../../../services/copper/types";

export type Props = {
  opportunities: OpportunityType[];
  onNavigateToCreateOpportunity: () => void;
};

const Opportunities: FC<Props> = ({ opportunities, onNavigateToCreateOpportunity }) => (
  <>
    <Title
      title={`Opportunities (${size(opportunities)})`}
      onClick={onNavigateToCreateOpportunity}
    />
    {!size(opportunities)
      ? (<NoFound text="No opportunities found"/>)
      : opportunities.map((o) => (
        <Opportunity key={o.id} opportunity={o} />
      ))
    }
  </>
);

export { Opportunities };
