import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type NotesProps = {
  id: number | string;
};

const Notes = ({ id }: NotesProps) => {
  const [note, setNote] = useState(
    () => localStorage.getItem(`notes_${id}`) || "",
  );

  return (
    <div>
      <h2 className="text-2xl">Notes:</h2>
      <textarea
        className="mt-10 w-full h-40 p-5 border rounded-2xl text-lg leading-loose bg-transparent"
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
        <Button
          onClick={() => {
            localStorage.removeItem(`notes_${id}`);
            setNote("");
            alert("Note deleted!");
          }}
          variant="destructive"
          className="ml-3"
        >
          Delete Note
        </Button>
      </div>
    </div>
  );
};

export default Notes;
