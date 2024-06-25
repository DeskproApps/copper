import { Container } from "../common";
import { NoteForm } from "../NoteForm";
import type { FC } from "react";
import type { Props as FormProps } from "../NoteForm";

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
