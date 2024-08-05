import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockActivities } from "@/testing";
import { Note } from "../Note";
import type { Props } from "../Note";

const mockNote = mockActivities[5];

const renderNotes = (props?: Partial<Props>) => render((
  <Note
    note={props?.note || mockNote as never}
    isLast={props?.isLast || false}
  />
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("Note", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderNotes();

      expect(await findByText(/14 May 2024/i)).toBeInTheDocument();
      expect(await findByText(/note note note note note/i)).toBeInTheDocument();
    });
  });
});
