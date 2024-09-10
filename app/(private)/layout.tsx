import NavBar from "@/app/components/NavBar";
import { verifySession } from "@/app/lib/dal";
import { customFetch } from "../components/customFetch";

export default async function PrivateLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const session: { isAuth: boolean; userId: number; role: string, accessToken: string } =
    await verifySession();
  const userRole = session?.role;

  const imageData = await customFetch(
    "http://fastapi:8000/api/customers/2/image",
    session.accessToken
  );
  const userImage: string = await imageData.json();


  return (
    <main>
      <NavBar UserRole={userRole} UserImage={userImage} />
      {children}
    </main>
  );
}
