import { HorizontalDivider, Property } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { DPNormalize } from "../../common";
import type { FC } from "react";
import type { IActivity } from "../../../api/types";

export type Props = {
  note: IActivity;
  isLast: boolean;
};

const Note: FC<Props> = ({ note, isLast }) => (
  <>
    <Property
      label={format(note.activity_date)}
      text={<DPNormalize text={note.details} />}
    />
    {!isLast && <HorizontalDivider />}
  </>
);

export { Note };
