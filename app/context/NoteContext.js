"use client";

import { useState } from "react";
import { createContext } from "react";
export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [addingNote, setAddingNote] = useState(false);

  const setAllNotes = (allNotes) => {
    setNotes(allNotes);
  };

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const editNote = (updated) => {
    const newNotes = notes.map((note) => {
      if (note.id === updated.id) {
        return { ...note, ...updated };
      }
      return note;
    });
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const updated = notes.filter((note) => note.id !== id);
    setNotes(updated);
  };

  const toggleAddingNote = () => {
    setAddingNote((prev) => !prev);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setAllNotes,
        addNote,
        deleteNote,
        editNote,
        addingNote,
        toggleAddingNote,
      }}
    >
      <div>{children}</div>
    </NoteContext.Provider>
  );
};
