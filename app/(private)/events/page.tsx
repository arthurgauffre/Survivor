import SpawnHeadband from "@/app/components/SpawnHeadband";
import Calendar from "./calendar";
import { PlusIcon } from "@heroicons/react/20/solid";
import { verifySession } from "@/app/lib/session";
import { customFetch } from "@/app/components/customFetch";
import { redirect } from "next/navigation";

export default async function ResponsiveCalendarMap() {
  const session: { isAuth: boolean; userId: number; role: string, accessToken: string } =
    await verifySession();
  const userRole = session?.role;
  const accessToken: string = session?.accessToken;
  let data;
  let client;

  switch (userRole) {
    case "admin":
      data = await customFetch("http://fastapi:8000/api/events/", accessToken);
      break;
    case "customer":
      data = await customFetch("http://fastapi:8000/api/customers/" + session.userId, accessToken);
      client = await data.json();
      data = await customFetch("http://fastapi:8000/api/events/" + client.linkedCoach, accessToken);
      break;
    case "coach":
      data = await customFetch("http://fastapi:8000/api/events/", accessToken);
      break;
    default:
      redirect("/login");
  }

  let events = await data.json();

  return (
    <SpawnHeadband
      title="Events"
      elemRight={
        <div className="flex">
          <button className="ml-4 bg-[#2263b3] text-white py-2 px-2 rounded text-sm">
            <PlusIcon className="h-6 w-6"></PlusIcon>
          </button>
        </div>
      }
    >
      <div className="max-w-6xl mx-auto p-4">
        <Calendar events={events} />
      </div>
    </SpawnHeadband>
  );
}
