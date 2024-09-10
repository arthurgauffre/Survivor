"use client";

import SpawnHeadband from "@/app/components/SpawnHeadband";
import Calendar from "./calendar";
import { PlusIcon } from "@heroicons/react/20/solid";

const events = [
  {
    id: 1,
    name: "Cooking Class",
    date: "2024-06-26",
    duration: 120,
    max_participants: 181,
    location_x: "48.5734",
    location_y: "7.7521",
    type: "Seminar",
    employee_id: 8,
    location_name: "Place Kléber, Strasbourg",
  },
  {
    id: 2,
    name: "Wine Tasting",
    date: "2024-07-03",
    duration: 90,
    max_participants: 198,
    location_x: "50.6292",
    location_y: "3.0573",
    type: "Gala",
    employee_id: 18,
    location_name: "Grand Place, Lille",
  },
  {
    id: 3,
    name: "Wine Tasting",
    date: "2024-07-03",
    duration: 90,
    max_participants: 198,
    location_x: "50.6292",
    location_y: "3.0573",
    type: "Gala",
    employee_id: 18,
    location_name: "Grand Place, Lille",
  },
  {
    id: 4,
    name: "Wine Tasting",
    date: "2024-07-03",
    duration: 90,
    max_participants: 198,
    location_x: "50.6292",
    location_y: "3.0573",
    type: "Gala",
    employee_id: 18,
    location_name: "Grand Place, Lille",
  },
  {
    id: 5,
    name: "Wine Tasting",
    date: "2024-07-03",
    duration: 90,
    max_participants: 198,
    location_x: "50.6292",
    location_y: "3.0573",
    type: "Gala",
    employee_id: 18,
    location_name: "Grand Place, Lille",
  },
  {
    id: 6,
    name: "Wine Tasting",
    date: "2024-07-03",
    duration: 90,
    max_participants: 198,
    location_x: "50.6292",
    location_y: "3.0573",
    type: "Gala",
    employee_id: 18,
    location_name: "Grand Place, Lille",
  },
  {
    id: 7,
    name: "Wine Tasting",
    date: "2024-09-10",
    duration: 90,
    max_participants: 198,
    location_x: "50.6292",
    location_y: "3.0573",
    type: "Gala",
    employee_id: 18,
    location_name: "Grand Place, Lille",
  },
];

export default function ResponsiveCalendarMap() {
  return (
    <SpawnHeadband
      title="Events"
      elemRight={
        <div className="flex">
          <button className="ml-4 bg-[#2263b3] text-white py-2 px-2 rounded text-sm">
            <PlusIcon className="h-6 w-6"></PlusIcon>
          </button>
        </div>
      }
    >
      <div className="max-w-6xl mx-auto p-4">
        <Calendar events={events} />
      </div>
    </SpawnHeadband>
  );
}
