"use client";

import { useState } from "react";
import { PencilSquareIcon, ShareIcon, PlusIcon } from "@heroicons/react/24/outline";

export function NoteLayout() {

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Ma première note",
      content: "Contenu de la première note...",
    },
    {
      id: 2,
      title: "Idées d'entraînement",
      content: "Liste des exercices à faire...",
    },
  ]);
  const [selectedNote, setSelectedNote] = useState({
    id: 1,
    title: "Ma première note",
    content: "Contenu de la première note...",
  });

  const handleNewNote = () => {
    const newNote = { id: Date.now(), title: "Nouvelle note", content: "" };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
  };

  const handleNoteSelect = (note:{
    id: number,
    title: string,
    content: string,
  }) => {
    setSelectedNote(note);
  };

  const handleNoteChange = (field: string, value: string) => {
    if (selectedNote) {
      const updatedNote = { ...selectedNote, [field]: value };
      setSelectedNote(updatedNote);
      setNotes(
        notes.map((note) => (note.id === selectedNote.id ? updatedNote : note))
      );
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white">
      <aside className="w-64 border-r">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Mes Notes</h2>
          <button onClick={handleNewNote} className="w-full mb-4 flex items-center text-center">
            <PlusIcon className="mr-2 h-4 w-4" /> Nouvelle Note
          </button>
          <div className="h-[calc(100vh-8rem-80px)]">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`p-2 mb-2 rounded cursor-pointer ${
                  selectedNote?.id === note.id
                    ? "bg-accent"
                    : "hover:bg-accent/50"
                }`}
                onClick={() => handleNoteSelect(note)}
              >
                {note.title}
              </div>
            ))}
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Éditeur de Notes</h1>
          <button className="flex justify-center items-center">
            <ShareIcon className="mr-2 h-4 w-4" /> Partager avec le Coach
          </button>
        </header>
        {selectedNote ? (
          <div className="p-4 flex-1 flex flex-col">
            <input
              value={selectedNote.title}
              onChange={(e) => handleNoteChange("title", e.target.value)}
              className="text-xl font-semibold mb-4"
              placeholder="Titre de la note"
            />
            <textarea
              value={selectedNote.content}
              onChange={(e) => handleNoteChange("content", e.target.value)}
              className="flex-1 resize-none flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Commencez à écrire votre note ici..."
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <PencilSquareIcon className="mx-auto h-12 w-12 mb-4" />
              <p>
                Sélectionnez une note ou créez-en une nouvelle pour commencer
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
