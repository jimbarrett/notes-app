"use client";
import { useContext, useEffect } from "react";
import { NoteContext } from "@/app/context/NoteContext";
import { NotesForm } from "../NotesForm/NotesForm";
import Link from "next/link";
import Search from "../Search";

const Notes = () => {
  const { notes, deleteNote, setAllNotes, addingNote, toggleAddingNote } =
    useContext(NoteContext);

  const truncate = (str, chars = 70) => {
    if (str.length <= chars) return str;
    return str.slice(0, chars) + "...";
  };

  const handleDeleteNote = async (id) => {
    const res = await fetch("/api/notes/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    let deleted = await res.json();
    deleteNote(id);
  };

  const getDisplayDate = (note) => {
    let outDate = note.createdAt,
      label = "Created ";
    if (note.updatedAt > note.createdAt) {
      outDate = note.updatedAt;
      label = "Updated ";
    }
    const od = new Date(outDate).toLocaleString();
    return { label, od };
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      const data = await response.json();
      return data.allNotes;
    };
    fetchNotes().then((data) => {
      setAllNotes(data);
    });
  }, []);

  return (
    <div className="w-full px-12 flex flex-col-reverse lg:flex-row  gap-3">
      <div className="box-border rounded-lg flex-grow p-4">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-bold">All Notes</h2>
          {!addingNote && (
            <>
              <Search />
              <button onClick={() => toggleAddingNote()}>+ Add</button>
            </>
          )}
        </div>
        {notes.length ? (
          <table className="w-full text-sm text-left">
            <thead className="text-sm uppercase light-green-bg text-white p-2">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Note</th>
                <th className="px-6 py-3"> </th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => {
                const dispDate = getDisplayDate(note);
                return (
                  <tr key={note.id} className="p-1 border-b">
                    <td className="px-6 py-3">
                      {dispDate.od}{" "}
                      <span className="text-xs italic ml-1">
                        ({dispDate.label})
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <Link href={`/note/${note.id}`} className="text-lg">
                        {truncate(note.content)}{" "}
                      </Link>
                    </td>
                    <td className="px-6 py-3">
                      <Link href={`/note/${note.id}`} className="mr-4">
                        View / Edit
                      </Link>
                      <button onClick={() => handleDeleteNote(note.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>No Notes Found</div>
        )}
      </div>
      {addingNote && (
        <div className="w-full lg:w-1/3">
          <NotesForm />
        </div>
      )}
    </div>
  );
};

export default Notes;
