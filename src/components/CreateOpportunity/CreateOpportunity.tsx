import { Container } from "@/components/common";
import { OpportunityForm } from "@/components/OpportunityForm";
import type { FC } from "react";
import type { Props as FormProps } from "@/components/OpportunityForm";

type Props = FormProps & {
  //..
};

const CreateOpportunity: FC<Props> = (props) => {
  return (
    <Container>
      <OpportunityForm {...props}/>
    </Container>
  );
};

export { CreateOpportunity };
