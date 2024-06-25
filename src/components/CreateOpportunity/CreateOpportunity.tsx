import { Container } from "../common";
import { OpportunityForm } from "../OpportunityForm";
import type { FC } from "react";
import type { Props as FormProps } from "../OpportunityForm";

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
