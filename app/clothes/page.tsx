import NewDropdownMenu from "../component/NewDropdownMenu";
import SpawnHeadband from "../component/SpawnHeadband";
import ImgDisplay from "./imgDisplay";
import SearchBar from "./searchBar";

const images = [
  {
    id: 1,
    imageUrl: "https://http.cat/images/530.jpg",
  },
  {
    id: 2,
    imageUrl:
      "https://i.kym-cdn.com/photos/images/newsfeed/002/422/058/391.jpg",
  },
  {
    id: 3,
    imageUrl:
      "https://image.spreadshirtmedia.net/image-server/v1/compositions/T235A1PA4253PT17X33Y9D186071565W6476H9353/views/1,width=1200,height=630,appearanceId=1,backgroundColor=F2F2F2/gnome-meme-dank-vous-avez-ete-gnomed-bavoir-bebe.jpg",
  },
  {
    id: 4,
    imageUrl:
      "https://media.threatpost.com/wp-content/uploads/sites/103/2021/10/14162918/rickroll-e1634243370645.jpg",
  },
  {
    id: 5,
    imageUrl: "https://http.cat/images/202.jpg",
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
    address: "123 Elm Street, Springfield"
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
    address: "456 Maple Avenue, Rivertown"
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
    address: "789 Oak Road, Greenfield"
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
    address: "101 Pine Street, Bluetown"
  }
];


export default async function Home() {
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

  return (
    <SpawnHeadband title="Clothes" littleText="Customize your drip">
      <div className="bg-white rounded-md shadow-md rounded-t-lg">
        <div>
          <div className="justify-center border-2">
            <SearchBar customers={customers}></SearchBar>
          </div>
          <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 space-y-1">
            <ImgDisplay images={images}></ImgDisplay>
            <ImgDisplay images={images}></ImgDisplay>
            <ImgDisplay images={images}></ImgDisplay>
            <ImgDisplay images={images}></ImgDisplay>
          </div>
        </div>
      </div>
    </SpawnHeadband>
  );
}
