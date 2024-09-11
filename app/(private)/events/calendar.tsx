"use client";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function CalendarBar({
  currentMonth,
  setCurrentMonth,
}: {
  readonly currentMonth: Date;
  readonly setCurrentMonth: (date: Date) => void;
}) {
  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{`${monthName} ${currentMonth.getFullYear()}`}</h2>
      <div className="flex items-center space-x-2">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function Calendar({
  events,
}: {
  readonly events: {
    id: number;
    name: string;
    date: string;
    duration: number;
    max_participants: number;
    location_x: string;
    location_y: string;
    type: string;
    employee_id: number;
    location_name: string;
  }[];
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  let firstEventOfMonth = events.filter((event) =>
    event.date.includes(
      `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`
    )
  )[0];
  if (!firstEventOfMonth) {
    firstEventOfMonth = events.filter(
      (event) =>
        new Date(event.date) >=
        new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    )[0];
  }
  const [isClient, setIsClient] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(firstEventOfMonth);

  // Ensure this code runs only on the client
  useEffect(() => {
    setIsClient(true); // This flag ensures rendering happens after the component is mounted
  }, []);

  if (!isClient) {
    // Prevent SSR-related mismatch issues
    return null; // Prevents rendering until the component is fully loaded on the client
  }

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

  const getEventsForDate = (date: string) =>
    events.filter((event) => event.date === date);

  const uniqueEventTypes = Array.from(
    new Set(events.map((event) => event.type))
  );

  const generateColor = () => {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const eventTypesColors = uniqueEventTypes.reduce((acc, eventType, index) => {
    acc[eventType] = generateColor(index, uniqueEventTypes.length);
    return acc;
  }, {});

  return (
    <div className="mb-8 w-full justify-center">
      <div className="p-4">
        <CalendarBar
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map((day, index) => (
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
              i + 2
            );
            const dateString = date.toISOString().split("T")[0];
            const dayEvents = getEventsForDate(dateString);
            return (
              <div
                key={`day-${i}`}
                className="h-24 w-full md:h-32 border rounded-md p-1 overflow-y-scroll overflow-hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style>
                  {`
      div::-webkit-scrollbar {
        display: none;
      }
    `}
                </style>
                <div className="text-right">{i + 1}</div>
                {dayEvents.map((event, index) => (
                  <button
                    key={event.location_name}
                    className="w-full"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div
                      style={{
                        backgroundColor: eventTypesColors[event.type],
                        color: "white",
                      }}
                      className={`text-xs p-1 rounded truncate`}
                      title={event.location_name}
                    >
                      {event.location_name}
                    </div>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full justify-center">
        <div className="p-4 w-full justify-center">
          <h2 className="text-2xl font-bold mb-4">
            {selectedEvent ? selectedEvent.location_name : "No event selected"}
          </h2>
          <div className="h-80">
            <iframe
              title="Map"
              src={`https://www.google.com/maps?q=${
                selectedEvent ? selectedEvent.location_x : "0"
              },${
                selectedEvent ? selectedEvent.location_y : "0"
              }&z=15&output=embed`}
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
  );
}
