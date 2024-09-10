"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { SubmitMessage } from "@/app/(private)/chat/submitMessage";

const contacts = [
  { id: 1, name: "Alice", lastMessage: "Hey, how are you doing?" },
  { id: 2, name: "Bob", lastMessage: "I'm good, thanks! How about you?" },
  { id: 3, name: "Charlie", lastMessage: "lol, I'm good too!" },
  { id: 4, name: "David", lastMessage: "I'm good, thanks! How about you?" },
  { id: 5, name: "Eve", lastMessage: "lol, I'm good too!" },
];

export function LeftMessage({
  image,
  text,
}: {
  image: string;
  text: string;
}): JSX.Element {
  return (
    <div className="flex items-end">
      <img className="h-8 w-8 rounded-full" src={image} alt="Contact Picture" />
      <div className="ml-2 bg-gray-200 rounded-lg p-3 max-w-xs">
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

export function RightMessage({ text }: { text: string }): JSX.Element {
  return (
    <div className="flex items-end justify-end">
      <div className="mr-2 bg-blue-500 text-white rounded-lg p-3 max-w-xs">
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

export function MainChat({
  selectedContact,
  toggleSidebar,
}: {
  selectedContact: number;
  toggleSidebar: () => void;
}): JSX.Element {
  const [state, action] = useFormState(SubmitMessage, undefined);
  const [message, setMessage] = useState("");

  return (
    <>
      {/* Chat Header */}
      <header className="bg-white border-b p-4 flex items-center justify-between">
        <button className="md:hidden" onClick={toggleSidebar}>
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </button>
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={`https://i.pravatar.cc/40?img=${selectedContact}`}
            alt="Alice"
          />
          <h1 className="ml-3 text-xl font-semibold">
            {contacts.find((contact) => contact.id === selectedContact)?.name}
          </h1>
        </div>
      </header>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <LeftMessage
          image={`https://i.pravatar.cc/40?img=${selectedContact}`}
          text="Hey, how are you doing?"
        />
        <RightMessage text="I'm good, thanks! How about you?" />
        <LeftMessage
          image={`https://i.pravatar.cc/40?img=${selectedContact}`}
          text="lol, I'm good too!"
        />
      </div>
      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <form className="flex space-x-2" action={action}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
            placeholder="Type a message ..."
          />
          {message && <SendButton setMessage={setMessage} />}
        </form>
      </div>
    </>
  );
}

export function SendButton({
  setMessage,
}: {
  setMessage: (message: string) => void;
}): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="bg-blue-500 rounded-md text-white"
      onClick={() => setMessage("")}
    >
      {pending ? (
        "Submitting..."
      ) : (
        <>
          <PaperAirplaneIcon className="h-5 w-10 " />
          <span className="sr-only">Send message</span>
        </>
      )}
    </button>
  );
}

export function ChatUi() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleContactSelect = (contact: number) => {
    setSelectedContact(contact);
    if (!sidebarOpen) toggleSidebar();
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white w-full flex-shrink-0 sm:max-w-xs ${
          sidebarOpen ? "hidden" : "block"
        } md:block`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <nav className="p-2">
          {contacts.map((contact) => (
            <button
              onClick={() => handleContactSelect(contact.id)}
              key={contact.id}
              className="w-full"
            >
              <LeftContact contacts={contact} />
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${sidebarOpen ? "block" : "hidden"}`}
      >
        <MainChat
          selectedContact={selectedContact}
          toggleSidebar={toggleSidebar}
        />
      </div>
    </div>
  );
}
