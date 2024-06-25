import { Container } from "../common";
import { ContactForm } from "../ContactForm";
import type { FC } from "react";
import type { Props as FormProps } from "../ContactForm";

type Props = FormProps & {
  //..
};

const EditContact: FC<Props> = (props) => {
  return (
    <Container>
      <ContactForm isEditMode {...props}/>
    </Container>
  );
};

export { EditContact };
