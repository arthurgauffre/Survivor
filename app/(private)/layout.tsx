import NavBar from "@/app/components/NavBar";
import { verifySession } from "@/app/lib/dal";

export default async function PrivateLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const session: { isAuth: boolean; userId: any; role: string } =
    await verifySession();
  const userRole = session?.role;

  console.log("session: ", session);
  console.log("User Role: ", userRole);

  return (
    <main>
      <NavBar UserRole={userRole}/>
      {children}
    </main>
  );
}
