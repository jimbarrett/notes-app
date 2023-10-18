"use client";
import { useState, useContext, useEffect } from "react";
import { NoteContext } from "@/app/context/NoteContext";

const Search = () => {
  const { setAllNotes } = useContext(NoteContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length < 1) {
      handleDoSearch(); //
    }
  }, [search]);

  const handleDoSearch = async () => {
    const response = await fetch("/api/notes/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ search }),
    });
    const found = await response.json();
    setAllNotes(found.foundNotes);
  };

  return (
    <div className="flex">
      <input
        className="p-1 shadow-sm border-2 outline-none"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button
        className="light-green-bg text-white px-3 flex-grow shadow-sm"
        onClick={handleDoSearch}
      >
        Search
      </button>
      <button className="text-sm ml-4" onClick={() => setSearch("")}>
        CLEAR
      </button>
    </div>
  );
};

export default Search;
