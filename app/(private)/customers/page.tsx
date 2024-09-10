import CustomersTable from "@/app/(private)/customers/customersTable";

import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { customFetch } from "@/app/components/customFetch";
import { getCustomersImage } from "@/app/(private)/customers/getCustomersImage";

export default async function Page() {
  const session: { isAuth: boolean; userId: number; role: string, accessToken: string } =
    await verifySession();
  const userRole = session?.role;
  const accessToken: string = session?.accessToken;

  switch (userRole) {
    case "admin":
      return <CustomersPage accessToken={accessToken} />;
    case "user":
      redirect("/dashboard");
    case "coach":
      return <CustomersPage accessToken={accessToken} />;
    default:
      redirect("/login");
  }
}

export async function CustomersPage({accessToken}: {accessToken: string}) {
  try {
    let customersData = await customFetch("http://fastapi:8000/api/customers", accessToken);
    let customers = await customersData.json();

    let IMGS: string[] = await getCustomersImage(accessToken);

    return <CustomersTable customers={customers} customersImage={IMGS}/>;
  } catch (e) {
    return <CustomersTable customers={[]} customersImage={[]}/>;
  }
}
