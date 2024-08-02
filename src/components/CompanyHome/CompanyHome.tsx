import { Title } from "@deskpro/app-sdk";
import { Container } from "@/components/common";
import type { FC } from "react";

type Props = {
  // @todo: will be implemented in next PR
};

const CompanyHome: FC<Props> = () => {
  return (
    <Container>
      <Title title="Company Home" />
    </Container>
  );
};

export { CompanyHome };
