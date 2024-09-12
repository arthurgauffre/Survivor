"use client";

import { useState } from "react";
import {
  PencilSquareIcon,
  ShareIcon,
  PlusIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { NewNote } from "@/app/(private)/note/NewNote";
import { UpdateNote } from "./UpdateNote";
import { Content } from "next/font/google";

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

type Note = {
  title: string;
  content: string;
  shared: boolean;
  id: number;
};

export function NoteLayout({
  notes,
  userId,
  userRole,
  accessToken,
}: {
  notes: {
    title: string;
    content: string;
    shared: boolean;
    id: number;
  }[];

  userId: number;
  userRole: string;
  accessToken: string;
}): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setText(note.content);
    if (!sidebarOpen) toggleSidebar();
  };

  const [state, action] = useFormState(NewNote, undefined);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100">
      <div
        className={`bg-white w-full flex-shrink-0 sm:max-w-xs ${
          sidebarOpen ? "hidden" : "block"
        } md:block border-r`}
      >
        <div className="p-4 flex">
          <h2 className="text-xl grow font-semibold">Mes Notes</h2>
          {userRole === "customer" && (
            <form className="flex space-x-2" action={action}>
              <input
                id="userId"
                name="userId"
                defaultValue={userId}
                type="number"
                className="hidden"
              />
              <input
                id="accessToken"
                name="accessToken"
                defaultValue={accessToken}
                type="text"
                className="hidden"
              />
              <button
                type="submit"
                className="ml-4 bg-[#2263b3] text-white py-2 px-2 rounded text-sm"
              >
                <PlusIcon className="h-4 w-4"></PlusIcon>
              </button>
            </form>
          )}
        </div>
        <div className="p-2">
          <nav className="p-2">
            {notes.map((note) => (
              <button
                onClick={() => handleNoteSelect(note)}
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
          <button className="md:hidden" onClick={toggleSidebar}>
            <ArrowLeftIcon className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <button className="flex justify-center items-center">
            <ShareIcon className="mr-2 h-4 w-4" /> Share with Coach
          </button>
        </header>
        {selectedNote && (
          <div className="p-4 flex-1 flex flex-col">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                UpdateNote({
                  accessToken,
                  note: {
                    title: title,
                    content: text,
                    shared: selectedNote.shared,
                    id: selectedNote.id,
                  },
                });
              }}
              className="text-xl font-semibold mb-4"
            />
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                UpdateNote({
                  accessToken,
                  note: {
                    title: title,
                    content: text,
                    shared: selectedNote.shared,
                    id: selectedNote.id,
                  },
                });
              }}
              className="flex-1 resize-none flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        )}
      </main>
    </div>
  );
}
