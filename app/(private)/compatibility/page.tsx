import AstrologicalDropDownMenu from "./AstroCompatibility";

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
      return <CompatibilityPage accessToken={accessToken} />;
    case "user":
      return <CompatibilityPage accessToken={accessToken} />
    case "coach":
      return <CompatibilityPage accessToken={accessToken} />;
    default:
      redirect("/login");
  }
}

export async function CompatibilityPage({accessToken}: {accessToken: string}) {

  try {
    let data = await customFetch("http://fastapi:8000/api/customers", accessToken);
    let posts: {
      id: number;
      name: string;
      surname: string;
      astrologicalSign: string;
    }[] = await data.json();

    const customerList: [string, string][] = (
      posts.map(
        (customer: {
          id: number;
          name: string;
          surname: string;
          astrologicalSign: string;
        }) => [
          customer.name + " " + customer.surname,
          customer.astrologicalSign,
        ]
      ) as [string, string][]
    ).sort();

    return <AstrologicalDropDownMenu data={customerList} />;
  } catch (e) {
    return <AstrologicalDropDownMenu data={[]} />;
  }
}
