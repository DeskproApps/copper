import { size } from "lodash";
import { Title } from "@deskpro/app-sdk";
import { NoFound } from "../../common";
import { Opportunity } from "./Opportunity";
import type { FC } from "react";
import type { IOpportunity } from "../../../api/types";

export type Props = {
  opportunities: IOpportunity[];
};

const Opportunities: FC<Props> = ({ opportunities }) => (
  <>
    <Title title={`Opportunities (${size(opportunities)})`}/>
    {!size(opportunities)
      ? (<NoFound text="No opportunities found"/>)
      : opportunities.map((o) => (
        <Opportunity key={o.id} opportunity={o} />
      ))
    }
  </>
);

export { Opportunities };
