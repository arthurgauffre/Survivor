"use client";
import { useRouter } from "next/navigation";
import InputRequest from "./inputRequest";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  Cog8ToothIcon,
  PlusIcon,
  CloudArrowDownIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { MenuButton, Menu, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import "@/app/components/table.css";
import SpawnHeadband from "@/app/components/SpawnHeadband";
import DropdownMenu from "@/app/components/DropdownMenu";
import CheckBoxAll from "@/app/components/CheckBoxAll";

const ActionsActions = [
  { name: "Edit", href: "customers", class: "" },
  { name: "Delete", href: "#", class: " text-red-500" },
];

export default function CustomersTable({
  customers,
  customersImage,
}: {
  readonly customers: {
    id: number;
    email: string;
    name: string;
    surname: string;
    birth_date: string;
    gender: string;
    description: string;
    astrologicalSign: string;
  }[];
  readonly customersImage: {
    id: number;
    image_url: string;
  }[];
}): JSX.Element {
  let littleText = "You have total of " + customers.length + " Customers";
  const router = useRouter();

  return (
    <SpawnHeadband
      title="Customers"
      littleText={littleText}
      elemRight={
        <div className="flex">
          <button className="ml-4 bg-white text-[#2263b3] py-2 px-2 rounded text-sm flex items-center">
            <CloudArrowDownIcon className="h-6 w-6 mr-2"></CloudArrowDownIcon>
            <p>Export</p>
          </button>
          <button className="ml-4 bg-[#2263b3] text-white py-2 px-2 rounded text-sm">
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
              {/* <InputRequest title="Search" placeholderString="Search" /> */}
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
                    <CheckBoxAll />
                  </th>
                  <th>Coach</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Payement Method</th>
                  <th align="right" className="pr-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((person) => (
                  <tr
                    key={person.id}
                    onClick={() => router.push(`/customers/${person.id}`)}
                  >
                    <td>
                      <input className="RowBox" type="checkbox" />
                    </td>
                    <td>
                      <span className="cell-header">Coach:</span>
                      <div className="flex items-center">
                        <Image
                          alt="picture of user"
                          src={`data:image/png;base64,${customersImage.shift()}`}
                          width={48}
                          height={48}
                          className="rounded-full mr-4 my-1"
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
                    </td>
                    <td align="right">
                      <span className="cell-header">Actions:</span>
                      <Menu>
                        <MenuButton className="relative flex max-w-xs items-center">
                          <EllipsisHorizontalIcon className="h-6 text-gray-400 px-2"></EllipsisHorizontalIcon>
                        </MenuButton>
                        <MenuItems
                          transition
                          className="absolute right-8 z-10 mt-2 px-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          {ActionsActions.map((item) => (
                            <MenuItem key={item.name}>
                              <a
                                href={item.href + "/" + person.id}
                                className={
                                  "block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" +
                                  item.class
                                }
                              >
                                {item.name}
                              </a>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Menu>
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
