import { Container } from "@/components/common";
import { NoteForm } from "@/components/NoteForm";
import type { FC } from "react";
import type { Props as FormProps } from "@/components/NoteForm";

type Props = FormProps & {
  //..
};

const CreateNote: FC<Props> = (props) => {
  return (
    <Container>
      <NoteForm {...props}/>
    </Container>
  );
};

export { CreateNote };
