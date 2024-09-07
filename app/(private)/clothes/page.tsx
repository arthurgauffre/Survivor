import NewDropdownMenu from "@/app/components/NewDropdownMenu";
import SpawnHeadband from "@/app/components/SpawnHeadband";
import ImgDisplay from "./imgDisplay";
import SearchBar from "./searchBar";

const images = [
  {
    id: 62,
    customer_id: 1,
    type: "hat/cap",
    link: "http://fastapi:8000/static/clothes/62.jpg",
  },
  {
    id: 104,
    customer_id: 1,
    type: "hat/cap",
    link: "http://fastapi:8000/static/clothes/104.jpg",
  },
];

export default async function ClothesPage() {
  // let customers = [];
  // let images = []
  // try {
  //   let data = await fetch('http://fastapi:8000/api/customers');
  //   customers = await data.json();
  //   data = await fetch('http://fastapi:8000/api/images');
  //   iages = await data.json();
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
  let customers = await fetch("http://fastapi:8000/api/customers");
  let customersData = await customers.json();
  let clothes = await fetch("http://fastapi:8000/api/clothes");
  let clothesData: {
    id: number;
    customer_id: number;
    type: string;
    link: string;
  }[] = await clothes.json();

  return (
    <SpawnHeadband title="Clothes" littleText="Customize your drip">
      <div className="bg-white rounded-md shadow-md rounded-t-lg">
        <div>
          <div className="justify-center border-2">
            <SearchBar customers={customersData}></SearchBar>
          </div>
          <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 space-y-1">
            <ImgDisplay images={clothesData}></ImgDisplay>
            <ImgDisplay images={clothesData}></ImgDisplay>
            <ImgDisplay images={clothesData}></ImgDisplay>
            <ImgDisplay images={clothesData}></ImgDisplay>
          </div>
        </div>
      </div>
    </SpawnHeadband>
  );
}
