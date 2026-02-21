import { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { Button } from "./ui/button";

type NotesProps = {
  id: number | string;
};

type Note = {
  id: string;
  note: string;
};

const Notes = ({ id }: NotesProps) => {
  const idStr = String(id);
  console.log(idStr);
  const [note, setNote] = useState(() => {
    const raw = localStorage.getItem("notes");
    console.log("idStr:", idStr);
    console.log("raw notes:", raw);
    if (!raw) return "";
    const parsed = JSON.parse(raw) as Note[];
    const notes: Note[] = Array.isArray(parsed) ? parsed : [];
    return notes.find((n) => n.id === idStr)?.note ?? "";
  });

  console.log(note);

  function saveNote() {
    const raw = localStorage.getItem("notes");
    const parsed = raw ? JSON.parse(raw) : [];
    const notes: Note[] = Array.isArray(parsed) ? parsed : [];
    const index = notes.findIndex((n) => n.id === idStr);
    if (index === -1) notes.push({ id: idStr, note });
    else notes[index].note = note;
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function deleteNote() {
    const raw = localStorage.getItem("notes");
    const parsed = raw ? JSON.parse(raw) : [];
    const notes: Note[] = Array.isArray(parsed) ? parsed : [];
    localStorage.setItem(
      `notes`,
      JSON.stringify(notes.filter((n) => n.id !== idStr)),
    );
    setNote("");
  }

  return (
    <div>
      <h2 className="ml-3 text-2xl flex items-center gap-2">
        <BsPencilFill className="text-black" />
        <span className="ml-2">Notes:</span>
      </h2>
      <textarea
        className="mt-10 w-full h-40 p-5 border rounded-2xl text-lg leading-loose bg-transparent"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes here..."
      />
      <div className="mt-5 flex justify-end">
        <Button onClick={saveNote} variant="default">
          Save Note
        </Button>
        <Button onClick={deleteNote} variant="destructive" className="ml-3">
          Delete Note
        </Button>
      </div>
    </div>
  );
};

export default Notes;
