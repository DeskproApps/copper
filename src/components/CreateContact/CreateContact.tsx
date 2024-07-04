import { Container, Navigation } from "../common";
import { ContactForm } from "../ContactForm";
import type { FC } from "react";
import type { Props as FormProps } from "../ContactForm";

type Props = FormProps & {
  onNavigateToLink: () => void;
};

const CreateContact: FC<Props> = ({ onNavigateToLink, ...props }) => {
  return (
    <Container>
      <Navigation onNavigateToLink={onNavigateToLink}/>
      <ContactForm {...props}/>
    </Container>
  );
};

export { CreateContact };
