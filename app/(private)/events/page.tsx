"use client";
import SpawnHeadband from "@/app/components/SpawnHeadband";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const events = [
  {
    date: "2024-07-02",
    title: "Lorem ipsum passage - Product Release",
    color: "bg-blue-600",
    location_x: "48.5734",
    location_y: "7.7521",
  },
  {
    date: "2024-07-03",
    title: "1:30p Reader will be distracted",
    color: "bg-red-500",
    location_x: "50.6292",
    location_y: "3.0573",
  },
  {
    date: "2024-07-05",
    title: "The leap into electronic",
    color: "bg-blue-600",
    location_x: "48.8566",
    location_y: "2.3522",
  },
  {
    date: "2024-07-07",
    title: "4p Jidehxe gegoj fupeione.",
    color: "bg-red-200",
    location_x: "45.1852",
    location_y: "5.7319",
  },
  { date: "2024-07-12", title: "Gibmuza viib hxpoibe.", color: "bg-pink-200" },
  {
    date: "2024-07-14",
    title: "1:30p Rabfov va hezow.",
    color: "bg-emerald-400",
    location_x: "49.2241",
    location_y: "6.0781",
  },
  { date: "2024-07-16", title: "4p Ke uzipiz zip.", color: "bg-sky-200" },
  {
    date: "2024-07-18",
    title: "5a Rujfogve kabwih haznojuf.",
    color: "bg-red-500",
    location_x: "48.7184",
    location_y: "5.9375",
  },
  {
    date: "2024-07-18",
    title: "7a simply dummy text of the printin",
    color: "bg-blue-200",
    location_x: "48.5734",
    location_y: "7.7521",
  },
  {
    date: "2024-07-18",
    title: "Piece of classical Latin literature",
    color: "bg-blue-600",
    location_x: "45.7580",
    location_y: "4.8000",
  },
];

export default function ResponsiveCalendarMap() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 6, 1)); // July 2024
  const [selectedEvent, setSelectedEvent] = useState({
    location_x: "50.6292",
    location_y: "3.0573",
    title: "Default Location",
  });

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  const getEventsForDate = (date: string) =>
    events.filter((event) => event.date === date);

  return (
    <SpawnHeadband title="Events">
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-8 w-full justify-center">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{`${monthName} ${currentMonth.getFullYear()}`}</h2>
              <div className="flex items-center space-x-2">
                <button>
                  <ChevronLeftIcon
                    className="h-4 w-4"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1,
                          1
                        )
                      )
                    }
                  />
                </button>
                <button>
                  <ChevronRightIcon
                    className="h-4 w-4"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1,
                          1
                        )
                      )
                    }
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {days.map((day) => (
                <div key={day} className="text-center font-semibold">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 w-full gap-2">
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div
                  key={`empty-${i}`}
                  className="h-24 md:h-32 border rounded-md"
                ></div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  i + 1
                );
                const dateString = date.toISOString().split("T")[0];
                const dayEvents = getEventsForDate(dateString);
                return (
                  <div
                    key={i}
                    className="h-24 w-full md:h-32 border rounded-md p-1 overflow-hidden"
                  >
                    <div className="text-right">{i + 1}</div>
                    {dayEvents.map((event) => (
                      <button
                        key={event.title}
                        className="w-full"
                        onClick={() =>
                          setSelectedEvent({
                            location_x: event.location_x,
                            location_y: event.location_y,
                            title: event.title,
                          })
                        }
                      >
                        <div
                          className={`${event.color} text-white text-xs p-1 mb-1 rounded truncate`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full justify-center">
          <div className="p-4 w-full justify-center">
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            <div className="h-80">
              <iframe
                title="Map"
                src={`https://www.google.com/maps?q=${selectedEvent.location_x},${selectedEvent.location_y}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </SpawnHeadband>
  );
}
