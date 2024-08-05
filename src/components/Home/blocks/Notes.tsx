import { size } from "lodash-es";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "@/utils";
import { NoFound } from "@/components/common";
import { Note } from "./Note";
import type { FC } from "react";
import type { Activity } from "@/services/copper/types";

export type Props = {
  notes: Activity[];
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
