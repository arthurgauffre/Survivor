"use server";

import { resolve } from "path";

export async function UpdateNote({
  accessToken,
  note,
}: {
  accessToken: string;
  note: {
    title: string;
    content: string;
    shared: boolean;
    id: number;
  };
}) {
  console.log({
    title: note.title,
    content: note.content,
    shared: Boolean(note.shared),
  });
  console.log(accessToken);

  const response = await fetch("http://fastapi:8000/api/note/" + note.id.toString(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: note.title,
      content: note.content,
      shared: note.shared,
    }),
  });
}
