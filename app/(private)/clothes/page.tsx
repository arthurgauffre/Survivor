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

type Image = {
  id: number;
  customer_id: number;
  type: string;
  link: string;
};

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
  let customers = [];
  let hat: Image[] = [];
  let top: Image[] = [];
  let bottom: Image[] = [];
  let shoes: Image[] = [];
  try {
    let customersData = await fetch("http://fastapi:8000/api/customers");
    let hatData = await fetch(
      "http://fastapi:8000/api/customers/1/clothes/hat"
    );
    let topData = await fetch(
      "http://fastapi:8000/api/customers/1/clothes/top"
    );
    let bottomData = await fetch(
      "http://fastapi:8000/api/customers/1/clothes/bottom"
    );
    let shoesData = await fetch(
      "http://fastapi:8000/api/customers/1/clothes/shoes"
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
