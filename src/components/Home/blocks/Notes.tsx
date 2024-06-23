import { size } from "lodash";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "../../../utils";
import { NoFound } from "../../common";
import { Note } from "./Note";
import type { FC } from "react";
import type { IActivity } from "../../../api/types";

export type Props = {
  notes: IActivity[];
  onNavigateToCreateNote: () => void;
};

const Notes: FC<Props> = ({ notes, onNavigateToCreateNote }) => (
  <>
    <Title
      title={`Notes (${size(notes)})`}
      onClick={onNavigateToCreateNote}
    />
    {!size(notes)
      ? <NoFound text="No notes found"/>
      : notes.map((note, idx) => (
        <Note key={note.id} note={note} isLast={isLast(notes, idx)}/>
      ))
    }
  </>
);

export { Notes };
