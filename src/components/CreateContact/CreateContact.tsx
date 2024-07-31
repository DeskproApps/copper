import { Container, Navigation } from "@/components/common";
import { ContactForm } from "@/components/ContactForm";
import type { FC } from "react";
import type { Props as FormProps } from "@/components/ContactForm";

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
