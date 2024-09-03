import SpawnHeadband from "../SpawnHeadband";
import InputRequest from "./inputRequest";
import ProfileOverview from "./profileOverview";
import DropdownMenu from "../component/DropdownMenu";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  Cog8ToothIcon,
} from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <SpawnHeadband title="Team">
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
          <ProfileOverview></ProfileOverview>
        </ul>
      </div>
    </SpawnHeadband>
  );
}
