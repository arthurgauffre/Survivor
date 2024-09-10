import CoachesTable from "@/app/(private)/compatibility/coaches/coachesTable";
import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { customFetch } from "@/app/components/customFetch";

export default async function Page() {
  const session: { isAuth: boolean; userId: number; role: string, accessToken: string } =
    await verifySession();
  const userRole = session?.role;
  const accessToken: string = session?.accessToken;

  switch (userRole) {
    case "admin":
      return <CoachesPage accessToken={accessToken} />;
    case "user":
      return <CoachesPage accessToken={accessToken} />
    case "coach":
      return <CoachesPage accessToken={accessToken} />;
    default:
      redirect("/login");
  }
}

export async function CoachesPage ({accessToken}: {accessToken: string}) {
  try {
    let data = await customFetch("http://fastapi:8000/api/employees", accessToken);
    let coaches: {
      id: number;
      email: string;
      name: string;
      surname: string;
      birthdate: string;
      gender: string;
      description: string;
      astrologicalSign: string;
    }[] = await data.json();
    let IMGS: {
      id: number;
      image_url: string;
    }[] = [];

    for (let coach of coaches) {
      let dataImg = await customFetch(
        "http://fastapi:8000/api/employees/" + coach.id + "/image", accessToken
      );
      let Img = await dataImg.json();
      IMGS.push(Img);
    }

    return <CoachesTable coaches={coaches} CoachImages={IMGS}/>;
  } catch (e) {
    console.log(e);
    return <CoachesTable coaches={[]} CoachImages={[]}/>;
  }
}
