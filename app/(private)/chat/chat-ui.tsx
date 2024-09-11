"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { SubmitMessage } from "@/app/(private)/chat/submitMessage";
import Image from "next/image";
import { MainChat } from "@/app/(private)/chat/main-chat";

export function LeftContact({
  contacts,
}: {
  contacts: { id: number; name: string; lastMessage: string; image: string };
}): JSX.Element {
  return (
    <div className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
      <Image
        src={`data:image/png;base64,${contacts.image}`}
        alt=""
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="ml-3 text-left">
        <p className="text-sm font-medium">{contacts.name}</p>
        <p className="text-xs text-gray-500">{contacts.lastMessage}</p>
      </div>
    </div>
  );
}

export function ChatUi({
  contacts,
  accessToken,
  userId,
  role,
}: {
  contacts: {
    contact_id: number;
    message: string | undefined;
    date: string | undefined;
    senderId: number | undefined;
    name: string;
    image: string;
  }[];
  accessToken: string;
  userId: number;
  role: string;
}): JSX.Element {
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
        } md:block border-r`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <nav className="p-2">
          {contacts.map((contact) => (
            <button
              onClick={() => handleContactSelect(contact.contact_id)}
              key={contact.contact_id}
              className="w-full"
            >
              <LeftContact
                contacts={{
                  id: contact.contact_id,
                  name: contact.name,
                  lastMessage: contact.message || "",
                  image: contact.image,
                }}
              />
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${sidebarOpen ? "block" : "hidden"}`}
      >
        <MainChat
          toggleSidebar={toggleSidebar}
          contact={{
            contact_id:
              contacts.find((contact) => contact.contact_id === selectedContact)
                ?.contact_id || 1,
            senderId: contacts.find(
              (contact) => contact.contact_id === selectedContact
            )?.senderId,
            name:
              contacts.find((contact) => contact.contact_id === selectedContact)
                ?.name || "",
            image:
              contacts.find((contact) => contact.contact_id === selectedContact)
                ?.image || "",
          }}
          accessToken={accessToken}
          userId={userId}
          role={role}
        />
      </div>
    </div>
  );
}
