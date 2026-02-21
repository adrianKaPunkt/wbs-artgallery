import { useState } from "react";
import { Button } from "./ui/button";

type NotesProps = {
  id: number | string;
};

const Notes = ({ id }: NotesProps) => {
  const [note, setNote] = useState(localStorage.getItem(`notes_${id}`) || "");
  console.log(note);

  return (
    <div>
      <h2 className="text-2xl">Notes:</h2>
      <textarea
        className="mt-10 w-full h-40 p-5 border rounded-2xl bg-transparent"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes here..."
      />
      <div className="mt-5 flex justify-end">
        <Button
          onClick={() => {
            localStorage.setItem(`notes_${id}`, note);
            alert("Note saved!");
          }}
          variant="default"
        >
          Save Note
        </Button>
      </div>
    </div>
  );
};

export default Notes;
