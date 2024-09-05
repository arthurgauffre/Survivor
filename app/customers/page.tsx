import "../component/table.css";
import SpawnHeadband from "../component/SpawnHeadband";
import InputRequest from "./inputRequest";
import DropdownMenu from "../component/DropdownMenu";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  Cog8ToothIcon,
  PlusIcon,
  CloudArrowDownIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";

const people = [
  {
    id: 1932437,
    email: "TaMEre@gmail.com",
    name: "Koda",
    surname: "Bear",
    birth_date: "1885-1-18",
    gender: "male",
    description: "string",
    astrological_sign: "string",
    phone_number: "07 85 93 85 93",
    address: "string",
  },
  {
    id: 1435872,
    email: "TaCousine@gmail.com",
    name: "Keenai",
    surname: "Bear",
    birth_date: "1545-5-10",
    gender: "male",
    description: "string",
    astrological_sign: "string",
    phone_number: "06 27 94 47 58",
    address: "string",
  },
  {
    id: 1235084,
    email: "TaTante@gmail.com",
    name: "string",
    surname: "string",
    birth_date: "string",
    gender: "string",
    description: "string",
    astrological_sign: "string",
    phone_number: "string",
    address: "string",
  },
  {
    id: 3649835,
    email: "TaSoeur@gmail.com",
    name: "string",
    surname: "string",
    birth_date: "string",
    gender: "string",
    description: "string",
    astrological_sign: "string",
    phone_number: "string",
    address: "string",
  },
  {
    id: 2487643,
    email: "TonPere@gmail.com",
    name: "string",
    surname: "string",
    birth_date: "string",
    gender: "string",
    description: "string",
    astrological_sign: "string",
    phone_number: "string",
    address: "string",
  },
];

export default function Home() {
  let numberOfCustomers = 0;
  // calculate number of Customers
  let littletext = "You have total of " + numberOfCustomers + " Customers";

  return (
    <SpawnHeadband
      title="Customers"
      litletext={littletext}
      elemRight={
        <div className="flex">
          <button className="ml-4 bg-blue-500 bg-white text-[#2263b3] py-2 px-2 rounded text-sm flex items-center">
            <CloudArrowDownIcon className="h-6 w-6 mr-2"></CloudArrowDownIcon>
            <p>Export</p>
          </button>
          <button className="ml-4 bg-blue-500 bg-[#2263b3] text-white py-2 px-2 rounded text-sm">
            <PlusIcon className="h-6 w-6"></PlusIcon>
          </button>
        </div>
      }
    >
      <div style={{ color: "Black" }}>
        <ul role="list" className="divide-y-2 divide-gray-100">
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

          <li>
            <table className="bg-white">
              <thead>
                <tr>
                  <th>
                    <input id="AllBox" type="checkbox" />
                  </th>
                  <th>Coach</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Payement Method</th>
                  <th align="right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {people.map((person) => (
                  <tr key={person.id}>
                    <td>
                      <input id="RowBox" type="checkbox" />
                    </td>
                    <td>
                      <span className="cell-header">Coach:</span>
                      <div className="flex items-center">
                        <img
                          alt=""
                          src="https://media.tenor.com/6uPPCdKYocAAAAAe/panik-kalm.png"
                          className="h-12 w-12 flex-none rounded-full bg-gray-50 mr-4 my-1"
                        />
                        {person.name} {person.surname}
                      </div>
                    </td>
                    <td>
                      <span className="cell-header">Email:</span>
                      {person.email}
                    </td>
                    <td>
                      <span className="cell-header">Phone:</span>
                      {person.birth_date}
                    </td>
                    <td>
                      <span className="cell-header">Payement Method:</span>
                      Ta mère
                    </td>
                    <td>
                      <span className="cell-header">Actions:</span>
                      <EllipsisHorizontalIcon className="h-6 text-gray-400 px-2"></EllipsisHorizontalIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </li>
        </ul>
      </div>
    </SpawnHeadband>
  );
}
