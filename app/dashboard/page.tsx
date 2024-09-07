import { verifySession } from "@/app/lib/dal";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session: { isAuth: boolean; userId: any; user?: { role: string } } = await verifySession();
  const userRole = session?.user?.role; // Assuming 'role' is part of the session object

  console.log("session: ", session);
  console.log("User Role: ", userRole);

  if (userRole === "admin") {
    return "Admin Dashboard";
  } else if (userRole === "user") {
    return "User Dashboard";
  } else {
    redirect("/login");
  }
}
