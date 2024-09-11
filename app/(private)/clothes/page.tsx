import SearchBar from "./searchBar";
import SpawnHeadband from "@/app/components/SpawnHeadband";
import { customFetch } from "@/app/components/customFetch";
import { verifySession } from "@/app/lib/session";

export default async function ClothesPage() {
  const session: {
    isAuth: boolean;
    userId: number;
    role: string;
    accessToken: string;
  } = await verifySession();
  const accessToken: string = session?.accessToken;

  let customers = [];
  try {
    let data = await customFetch(
      "http://fastapi:8000/api/customers",
      accessToken
    );
    customers = await data.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <SpawnHeadband title="Clothes" littleText="Customize your drip">
      <div className="bg-white rounded-md shadow-md rounded-t-lg">
        <SearchBar customers={customers} accessToken={accessToken} />
      </div>
    </SpawnHeadband>
  );
}
