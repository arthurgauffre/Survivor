import { customFetch } from "@/app/components/customFetch";
import { NoteLayout } from "./noteLayout";
import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session: {
    isAuth: boolean;
    userId: number;
    role: string;
    accessToken: string;
  } = await verifySession();
  const accessToken: string = session?.accessToken;

  switch (session?.role) {
    case "admin":
      redirect("/dashboard");
    case "coach":
      return CoachesPage({ session });
    case "customer":
      return CustomerPage({ session });
    default:
      redirect("/login");
  }
}

export async function CoachesPage({
  session,
}: {
  session: {
    isAuth: boolean;
    userId: number;
    role: string;
    accessToken: string;
  };
}) {
  const noteData: Response = await customFetch(
    "http://fastapi:8000/api/note",
    session.accessToken
  );

  const notes: {
    title: string;
    content: string;
    shared: boolean;
    id: number;
  }[] = await noteData.json();
  return (
    <NoteLayout
      notes={notes}
      userId={session.userId}
      accessToken={session.accessToken}
      userRole={session.role}
    />
  );
}

export async function CustomerPage({
  session,
}: {
  session: {
    isAuth: boolean;
    userId: number;
    role: string;
    accessToken: string;
  };
}) {
  const noteData: Response = await customFetch(
    "http://fastapi:8000/api/note",
    session.accessToken
  );

  const notes: {
    title: string;
    content: string;
    shared: boolean;
    id: number;
  }[] = await noteData.json();
  return (
    <NoteLayout
      notes={notes}
      userId={session.userId}
      accessToken={session.accessToken}
      userRole={session.role}
    />
  );
}
