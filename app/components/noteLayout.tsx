"use client";

import { useState } from "react";
import {
  PencilSquareIcon,
  ShareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const notes = [
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
  {
    id: 3,
    title: "Ma première note",
    content: "loreum ipsum...",
  },
];

export function LeftNote({
  note,
}: {
  note: { id: number; title: string };
}): JSX.Element {
  return (
    <div className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="ml-3 text-left">
        <p className="text-sm font-medium">{note.title}</p>
      </div>
    </div>
  );
}

export function NoteLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNewNote = () => {
    const newNote = { title: "Nouvelle note", content: "" };
    // get id of the new note
    setSelectedNote(10);
    handleNoteSelect(10);
  };
  const handleNoteSelect = (id: number) => {
    setSelectedNote(id);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100">
      <div
        className={`bg-white w-full flex-shrink-0 sm:max-w-xs ${
          sidebarOpen ? "hidden" : "block"
        } md:block`}
      >
        <div className="p-4 flex">
          <h2 className="text-xl grow font-semibold">Mes Notes</h2>
          <button
            className="ml-4 bg-[#2263b3] text-white py-2 px-2 rounded text-sm"
            onClick={handleNewNote}
          >
            <PlusIcon className="h-4 w-4"></PlusIcon>
          </button>
        </div>
        <div className="p-2">
          <nav className="p-2">
            {notes.map((note) => (
              <button
                onClick={() => handleNoteSelect(note.id)}
                key={note.id}
                className="w-full"
              >
                <LeftNote note={note} />
              </button>
            ))}
          </nav>
        </div>
      </div>
      <main
        className={`flex-1 flex flex-col ${sidebarOpen ? "block" : "hidden"}`}
      >
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
