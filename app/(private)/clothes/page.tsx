import NewDropdownMenu from "@/app/components/NewDropdownMenu";
import SpawnHeadband from "@/app/components/SpawnHeadband";
import ImgDisplay from "./imgDisplay";
import SearchBar from "./searchBar";
import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { customFetch } from "@/app/components/customFetch";

type Image = {
  id: number;
  customer_id: number;
  type: string;
  link: string;
};

export default async function Page() {
  const session: { isAuth: boolean; userId: number; role: string, accessToken: string } =
    await verifySession();
  const userRole = session?.role;
  const accessToken: string = session?.accessToken;

  switch (userRole) {
    case "admin":
      return <ClothesPage accessToken={accessToken} />;
    case "user":
      redirect("/dashboard");
    case "coach":
      return <ClothesPage accessToken={accessToken} />;
    default:
      redirect("/login");
  }
}

export async function ClothesPage({accessToken}: {accessToken: string}) {
  let customers = [];
  let hat: Image[] = [];
  let top: Image[] = [];
  let bottom: Image[] = [];
  let shoes: Image[] = [];
  try {

    let customersData = await customFetch("http://fastapi:8000/api/customers", accessToken);
    let hatData = await customFetch(
      "http://fastapi:8000/api/customers/1/clothes/hat", accessToken
    );
    let topData = await customFetch(
      "http://fastapi:8000/api/customers/1/clothes/top", accessToken
    );
    let bottomData = await customFetch(
      "http://fastapi:8000/api/customers/1/clothes/bottom", accessToken
    );
    let shoesData = await customFetch(
      "http://fastapi:8000/api/customers/1/clothes/shoes", accessToken
    );
    hat = await hatData.json();
    customers = await customersData.json();
    top = await topData.json();
    bottom = await bottomData.json();
    shoes = await shoesData.json();
  } catch (error) {
    customers = [];
  }

  return (
    <SpawnHeadband title="Clothes" littleText="Customize your drip">
      <div className="bg-white rounded-md shadow-md rounded-t-lg">
        <div>
          <div className="justify-center border-2">
            <SearchBar customers={customers}></SearchBar>
          </div>
          <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 space-y-1">
            <ImgDisplay images={hat}></ImgDisplay>
            <ImgDisplay images={top}></ImgDisplay>
            <ImgDisplay images={bottom}></ImgDisplay>
            <ImgDisplay images={shoes}></ImgDisplay>
          </div>
        </div>
      </div>
    </SpawnHeadband>
  );
}
