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

const customers = [
  {
    id: 1,
    email: "john.doe@example.com",
    password: "password123",
    name: "John",
    surname: "Doe",
    birthdate: "1990-05-15",
    gender: "Male",
    description: "Avid traveler and photography enthusiast.",
    astrologicalSign: "Taurus",
    birth_date: "1990-05-15",
    phone_number: "+1234567890",
    address: "123 Elm Street, Springfield",
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    password: "securePass!56",
    name: "Jane",
    surname: "Smith",
    birthdate: "1988-10-25",
    gender: "Female",
    description: "Tech geek and software developer.",
    astrologicalSign: "Scorpio",
    birth_date: "1988-10-25",
    phone_number: "+0987654321",
    address: "456 Maple Avenue, Rivertown",
  },
  {
    id: 3,
    email: "alex.johnson@example.com",
    password: "Alex@2024",
    name: "Alex",
    surname: "Johnson",
    birthdate: "1995-03-08",
    gender: "Non-binary",
    description: "Loves painting and music production.",
    astrologicalSign: "Pisces",
    birth_date: "1995-03-08",
    phone_number: "+1122334455",
    address: "789 Oak Road, Greenfield",
  },
  {
    id: 4,
    email: "emma.brown@example.com",
    password: "Emma#Secure",
    name: "Emma",
    surname: "Brown",
    birthdate: "1992-07-12",
    gender: "Female",
    description: "Fitness enthusiast and blogger.",
    astrologicalSign: "Cancer",
    birth_date: "1992-07-12",
    phone_number: "+3344556677",
    address: "101 Pine Street, Bluetown",
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
