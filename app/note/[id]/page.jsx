"use client";
import { useState, useContext, useEffect } from "react";
import { NoteContext } from "@/app/context/NoteContext";
import Link from "next/link";

const Note = ({ params }) => {
  const { editNote } = useContext(NoteContext);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const [original, setOriginal] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  const minLen = 20,
    maxLen = 300;

  useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch("/api/notes/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ id: params.id }),
      });
      const data = await response.json();
      return data.foundNote;
    };
    fetchNote().then((data) => {
      setContent(data.content);
      setOriginal(data);
    });
  }, [params.id]);

  useEffect(() => {
    if (content.length >= minLen && content.length <= maxLen) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [content]);

  const saveNote = async () => {
    const response = await fetch("/api/notes/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ id: params.id, content }),
    });
    const data = await response.json();
    return data.updatedNote;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isValid()) {
      const updated = {
        id: parseInt(params.id),
        content,
      };
      saveNote().then((data) => {
        setOriginal(data);
        editNote(data);
        setEditing(false);
      });
    } else {
      alert("invalid content");
    }
  };

  const isValid = () => {
    return content.length >= 20 && content.length <= 300;
  };

  const toggleEditing = () => {
    if (editing) setContent(original.content);
    setEditing((prev) => !prev);
  };

  const getDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const showContentCount = () => {
    if (content.length < 20) return content.length + "/" + minLen + " min";
    return content.length + "/" + maxLen + " max";
  };
  return (
    <div className="w-full px-12">
      <div className="mb-3">
        <Link href="/" className="main-button">
          Go Back
        </Link>
      </div>
      {original?.content?.length ? (
        <div className="w-full box-border rounded-lg p-6 mx-auto">
          <div className="flex justify-between items-center border-b border-green-800 pb-2">
            <div className="text-sm italic font-bold">
              Created: {getDate(original.createdAt)}
            </div>
            {original.updatedAt > original.createdAt && (
              <div className="text-sm italic font-bold ml-4">
                Updated: {getDate(original.updatedAt)}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={toggleEditing}
                className="secondary-button small-button"
              >
                {editing ? "Cancel" : "Edit"}
              </button>
              {editing && (
                <button
                  onClick={(e) => handleSave(e)}
                  className="main-button small-button"
                  disabled={!canSubmit}
                >
                  Save
                </button>
              )}
            </div>
          </div>

          <div className="w-full py-2">
            <textarea
              rows="20"
              className={`w-full p-2 resize-none border outline-none rounded-lg ${
                editing
                  ? "shadow-lg resize-y"
                  : "border-transparent bg-transparent"
              }`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={!editing}
            ></textarea>
          </div>

          <div
            className={`mb-2 italic text-sm w-full text-right ${
              !canSubmit && "font-bold text-red-600"
            }`}
          >
            {showContentCount()}
          </div>
        </div>
      ) : (
        <div className="py-12 w-full flex justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Note;
