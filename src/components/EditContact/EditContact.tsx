import { Container } from "@/components/common";
import { ContactForm } from "@/components/ContactForm";
import type { FC } from "react";
import type { Props as FormProps } from "@/components/ContactForm";

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
