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

export default async function Home() {
  let numberOfCoaches = 0;
  // calculate number of coaches
  let littletext = "You have total of " + numberOfCoaches + " coaches";
  let data = await fetch('http://fastapi:8000/api/employees');
  let coaches = await data.json();
  return (
    <SpawnHeadband
      title="Coaches"
      littleText={littletext}
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
                    <input id="AllBox" type="checkbox" />
                  </th>
                  <th>Coach</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Number of customers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((person) => (
                  <tr key={person.id}>
                    <td className="p-2">
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
                      <span className="cell-header">Number of customers:</span>
                      {person.birth_date}
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
