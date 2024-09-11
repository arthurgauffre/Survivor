import { verifySession } from "@/app/lib/dal";
import { redirect } from "next/navigation";
import DashboardCoachesPage from "./dashboardCoachesPage";
import DashboardClientsPage from "./dashboardClientsPage";
import DashboardAdminPage from "./dashboardAdminsPage";

export default async function Dashboard() {
  const session: { isAuth: boolean; userId: number; role: string, accessToken: string } =
    await verifySession();
  const userRole = session?.role;

  switch (userRole) {
    case "admin":
      return <DashboardAdminPage accessToken={session.accessToken} userId={session.userId} />;
    case "customer":
      return <DashboardClientsPage accessToken={session.accessToken} userId={session.userId} />;
    case "coach":
      return <DashboardCoachesPage accessToken={session.accessToken} userId={session.userId} />
    default:
      redirect("/login");
  }
}
