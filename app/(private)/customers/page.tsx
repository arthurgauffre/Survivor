import CustomersTable from "@/app/(private)/customers/customersTable";

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
      return <CustomersPage accessToken={accessToken} />;
    case "customer":
      redirect("/dashboard");
    case "coach":
      return <CustomersCoachingPage accessToken={accessToken} userId={session.userId}/>;
    default:
      redirect("/login");
  }
}

export async function CustomersPage({accessToken}: {readonly accessToken: string}) {
  try {
    let customersData = await customFetch("http://fastapi:8000/api/customers", accessToken);
    let customers = await customersData.json();

    let IMGS: {
      id: number;
      image_url: string;
    }[] = [];

    for (let customer of customers) {
      let dataImg = await customFetch(
        "http://fastapi:8000/api/customers/" + customer.id + "/image", accessToken
      );
      let Img = await dataImg.json();
      IMGS.push(Img);
    }

    return <CustomersTable customers={customers} customersImage={IMGS} accessToken={accessToken}/>;
  } catch (e) {
    return <CustomersTable customers={[]} customersImage={[]} accessToken={accessToken}/>;
  }
}

export async function CustomersCoachingPage({ accessToken, userId }: { readonly accessToken: string, readonly userId: number }) {
  try {
    let employee: {
      id: number;
      email: string;
      name: string;
      surname: string;
      birthDate: string;
      gender: string;
      work: string;
      customer_list: number[];
    }
    let employeeData = await customFetch("http://fastapi:8000/api/employees/" + userId, accessToken);
    employee = await employeeData.json();

    let customersData = await customFetch("http://fastapi:8000/api/customers", accessToken);
    let customers = await customersData.json();

    customers = customers.filter((customer: { id: number }) => employee.customer_list.includes(customer.id));

    let IMGS: {
      id: number;
      image_url: string;
    }[] = [];

    for (let customer of customers) {
      let dataImg = await customFetch(
        "http://fastapi:8000/api/customers/" + customer.id + "/image", accessToken
      );
      let Img = await dataImg.json();
      IMGS.push(Img);
    }

    return <CustomersTable customers={customers} customersImage={IMGS} accessToken={accessToken}/>;
  } catch (e) {
    return <CustomersTable customers={[]} customersImage={[]} accessToken={accessToken}/>;
  }
}
