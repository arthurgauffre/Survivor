"use server";

import { NewNoteFormState } from "@/app/lib/definitions";
import { redirect } from "next/navigation";

export async function NewNote(
  state: NewNoteFormState,
  formData: FormData
): Promise<NewNoteFormState> {

  const accessToken: string = formData.get("accessToken") as string;

  const response = await fetch("http://fastapi:8000/api/note", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: "New Note",
      content: "type your content here",
      shared: false,
      userId: Number(formData.get("userId")),
    }),
  });

  return redirect("/noterefresh");
}
