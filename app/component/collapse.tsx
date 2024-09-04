"use client";

import React, { useState } from "react";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Collapsible({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [open, setOPen] = useState(false);

  const toggle = () => {
    setOPen(!open);
  };

  return (
    <div onClick={toggle}>
      <div className="flex">
        <button>{title}</button>
        <div className="flex-grow"></div>
        <div className="flex items-center">
          {open ? (
            <ChevronUpIcon aria-hidden="true" className="h-6 w-6" />
          ) : (
            <ChevronDownIcon aria-hidden="true" className="h-6 w-6" />
          )}
        </div>
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}
