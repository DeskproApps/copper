import { Title } from "@deskpro/app-sdk";
import { Container, Navigation } from "../common";
import type { FC } from "react";

type Props = {
  onNavigateToLink: () => void;
};

const CreateContact: FC<Props> = ({ onNavigateToLink }) => {
  return (
    <Container>
      <Navigation onNavigateToLink={onNavigateToLink}/>
      <Title title="CreateContact"/>
    </Container>
  );
};

export { CreateContact };
