import { Container } from "../common";
import { ActivityForm } from "../ActivityForm";
import type { FC } from "react";
import type { Props as FormProps } from "../ActivityForm";

type Props = FormProps & {
  //..
};

const CreateActivity: FC<Props> = (props) => {
  return (
    <Container>
      <ActivityForm {...props}/>
    </Container>
  );
};

export { CreateActivity };
