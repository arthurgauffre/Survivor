import SpawnHeadband from "../SpawnHeadband";
import InputRequest from "./inputRequest";
import DropdownMenu from "../component/DropdownMenu";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  Cog8ToothIcon,
} from "@heroicons/react/20/solid";

const people = [
  {
    id: 13085,
    name: "Leslie",
    surname: "Alexander",
    email: "leslie.alexander@example.com",
    birth_date: "1990-01-01",
    gender: "female",
  },
  {
    id: 10344,
    name: "Truc",
    surname: "Moose",
    email: "leslie.alexander@example.com",
    birth_date: "1990-01-01",
    gender: "male",
  },
  {
    id: 50933,
    name: "Muche",
    surname: "Moose",
    email: "leslie.alexander@example.com",
    birth_date: "1990-01-01",
    gender: "male",
  },
  {
    id: 24425,
    name: "Koda",
    surname: "Bear",
    email: "leslie.alexander@example.com",
    birth_date: "1990-01-01",
    gender: "male",
  },
  {
    id: 12482,
    name: "Keenai",
    surname: "Bear",
    email: "leslie.alexander@example.com",
    birth_date: "1990-01-01",
    gender: "male",
  },
];

export default function Home() {
  let numberOfCoaches = 0;

  return (
    <SpawnHeadband title="Coaches" litletext="You have total of ... coaches">
      <div style={{ color: "Black" }}>
        <ul role="list" className="divide-y-2 divide-gray-100 ">
          <li className="flex gap-x-6 py-5 justify-between border-1 bg-white rounded-t-md px-4">
            <div className="flex">
              <DropdownMenu
                title="Bulk Action"
                elements={["thing one", "thing two"]}
              />
              <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
                Apply
              </button>
            </div>
            <div className="flex">
              <InputRequest title="Search" placeholderString="Search" />
              <div className="flex items-center border-r-2">
                <MagnifyingGlassIcon className="h-6 text-gray-400 px-2" />
              </div>
              <div className="flex items-center ml-2">
                <AdjustmentsHorizontalIcon className="h-6 text-gray-400 px-2" />
                <Cog8ToothIcon className="h-6 text-gray-400 px-2" />
              </div>
            </div>
          </li>

          <table className="bg-white" style={{ width: "100%" }}>
            <tr>
              <td className="p-2">
                <input id="AllBox" type="checkbox" />
              </td>
              <td>Coach</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Number of customers</td>
              <td>Actions</td>
            </tr>
            {people.map((person) => (
              <tr>
                <td className="p-2">
                  <input id="RowBox" type="checkbox" />
                </td>
                <td>
                  <div className="flex items-center">
                    <img
                      alt=""
                      src="https://media.tenor.com/6uPPCdKYocAAAAAe/panik-kalm.png"
                      className="h-12 w-12 flex-none rounded-full bg-gray-50 mr-4 my-1"
                    />
                    {person.name} {person.surname}
                  </div>
                </td>
                <td>{person.email}</td>
                <td>{person.birth_date}</td>
              </tr>
            ))}
          </table>
        </ul>
      </div>
    </SpawnHeadband>
  );
}
