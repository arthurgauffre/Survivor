"use server";

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

  const response = await fetch("http://fastapi:8000/api/note/note?noteId=" + note.id.toString(), {
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
