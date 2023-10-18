"use client";
import { useContext, useState, useRef, useEffect } from "react";
import { NoteContext } from "@/app/context/NoteContext";

export const NotesForm = () => {
  const { addNote, toggleAddingNote } = useContext(NoteContext);
  const [content, setContent] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const minLen = 20,
    maxLen = 300;

  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.focus();
  }, [focusRef]);

  useEffect(() => {
    if (content.length >= minLen && content.length <= maxLen) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [content]);

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const isValid = () => {
    return content.length >= minLen && content.length <= maxLen;
  };

  const doAddNote = async () => {
    const res = await fetch("/api/notes/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    let newNote = await res.json();
    addNote(newNote.data);
    setContent("");
    toggleAddingNote();
  };

  const handleSubmit = () => {
    if (!isValid()) {
      return false;
    }
    doAddNote();
  };

  const showContentCount = () => {
    if (content.length < 20) return content.length + "/" + minLen + " min";
    return content.length + "/" + maxLen + " max";
  };

  return (
    <div className="w-full box-border rounded-lg p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold mb-2">Add a Note</h2>
        <div
          className={`mb-2 italic text-sm ${
            !canSubmit && "font-bold text-red-600"
          }`}
        >
          {showContentCount()}
        </div>
      </div>
      <div className="mb-2">
        <textarea
          ref={focusRef}
          value={content}
          onChange={updateContent}
          rows="20"
          className="w-full p-2 resize-none focus:outline-none outline-1 border border-gray-200 rounded-lg shadow-lg"
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button onClick={() => toggleAddingNote()} className="secondary-button">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="main-button"
        >
          Save/Edit
        </button>
      </div>
    </div>
  );
};
