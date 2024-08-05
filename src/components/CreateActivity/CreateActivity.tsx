import { Container } from "@/components/common";
import { ActivityForm } from "@/components/ActivityForm";
import type { FC } from "react";
import type { Props as FormProps } from "@/components/ActivityForm";

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
