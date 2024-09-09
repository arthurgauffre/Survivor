"use client";

import SpawnHeadband from "@/app/components/SpawnHeadband";
import Calendar from "./calendar";

const events = [
  {
    id: 1,
    name: "Cooking Class",
    date: "2024-06-26",
    duration: 120,
    max_participants: 181,
    location_x: "48.5734",
    location_y: "7.7521",
    type:"Seminar",
    employee_id: 8,
    location_name:"Place Kléber, Strasbourg",
  },
  {
    id: 2,
    name:	"Wine Tasting",
    date:	"2024-07-03",
    duration:	90,
    max_participants: 198,
    location_x:	"50.6292",
    location_y:	"3.0573",
    type:	"Gala",
    employee_id: 18,
    location_name:	"Grand Place, Lille",
  }
];

export default function ResponsiveCalendarMap() {


  return (
    <SpawnHeadband title="Events">
      <div className="max-w-6xl mx-auto p-4">
        <Calendar events={events} />
      </div>
    </SpawnHeadband>
  );
}
