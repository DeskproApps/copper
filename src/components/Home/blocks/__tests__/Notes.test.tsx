import { cleanup } from "@testing-library/react";
import { render, mockActivities } from "../../../../../testing";
import { Notes } from "../Notes";
import type { Props } from "../Notes";

const mockNotes = [mockActivities[5]];

const renderNotes = (props?: Partial<Props>) => render(
  <Notes notes={props?.notes || mockNotes as never[]}/>
);

describe("Home", () => {
  describe("Notes", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderNotes();

      expect(await findByText(/Notes \(1\)/i)).toBeInTheDocument();
      expect(await findByText(/note note note note note/i)).toBeInTheDocument();
    });

    test("should show \"No notes found\"", async () => {
      const { findByText } = renderNotes({ notes: [] });

      expect(await findByText(/Notes \(0\)/i)).toBeInTheDocument();
      expect(await findByText(/No notes found/i)).toBeInTheDocument();
    });
  });
});
