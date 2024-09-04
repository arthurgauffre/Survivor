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
import { MenuButton, Menu, MenuItem, MenuItems } from "@headlessui/react";

const ActionsActions = [
  { name: "Edit", href: "coaches", class: "" },
  { name: "Delete", href: "#", class: " text-red-500" },
];

const coaches = [
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
  let littletext = "You have total of " + coaches.length + " coaches";

  function handleAllBoxClick() {
    let allBox = document.getElementById("AllBox");
    let rowBox = Array.from(document.getElementsByClassName("RowBox"));
    if (!allBox || !rowBox) return;
    rowBox.forEach((e) => {
      e.checked = allBox.checked;
    });
  }

  return (
    <SpawnHeadband
      title="Coaches"
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
                  <th className="p-2">
                    <input
                      id="AllBox"
                      type="checkbox"
                      onClick={handleAllBoxClick}
                    />
                  </th>
                  <th>Coach</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Number of customers</th>
                  <th align="right" className="pr-2">
                    Actions
                  </th>
                </tr>
                {people.map((person) => (
                  <tr className="border" key={person.id}>
                    <td className="p-2">
                      <input className="RowBox" type="checkbox" />
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
                    <td>{person.email}</td>
                    <td>{person.birth_date}</td>
                    <td className="pr-2" align="right">
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
