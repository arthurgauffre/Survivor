import "./../../component/table.css";
import MeetingTable from "./MeetingTable";
import PaymentHistoryTable from "./PaymentHistoryTable";
import React from "react";
import {
  EnvelopeIcon,
  BookmarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import SpawnHeadband from "../../component/SpawnHeadband";

const payments = [
  {
    id: 7,
    date: "2024-05-31",
    payment_method: "PayPal",
    amount: -78.44,
    comment: "Discount applied",
  },
  {
    id: 1,
    date: "2024-05-25",
    payment_method: "Bank Transfer",
    amount: 646.94,
    comment: "Annual subscription payment",
  },
  {
    id: 8,
    date: "2024-04-15",
    payment_method: "Bank Transfer",
    amount: 202.17,
    comment: "Annual subscription payment",
  },
  {
    id: 6,
    date: "2024-04-05",
    payment_method: "PayPal",
    amount: 0.16,
    comment: "Late fee included",
  },
  {
    id: 3,
    date: "2024-03-08",
    payment_method: "Credit Card",
    amount: -24.8,
    comment: "Discount applied",
  },
  {
    id: 2,
    date: "2024-02-08",
    payment_method: "PayPal",
    amount: 7.42,
    comment: "Monthly subscription payment",
  },
  {
    id: 5,
    date: "2024-02-04",
    payment_method: "Bank Transfer",
    amount: -48.91,
    comment: "Discount applied",
  },
  {
    id: 4,
    date: "2023-12-04",
    payment_method: "PayPal",
    amount: 89.82,
    comment: "Quarterly subscription payment",
  },
];

export default async function Page({ params }: { params: { id: string } }) {
  // let customersData = await fetch(
  //   "http://localhost:3000/api/customers/" + params.id
  // );
  // let customers = await customersData.json();
  let meetings: {
    id: number;
    customer_id: number;
    date: string;
    rating: number;
    comment: string;
    source: string;
  }[] = [];
  try {
    let meetingsData = await fetch(
      "http://fastapi:8000/api/encounters/customer/" + params.id
    );
    meetings = await meetingsData.json();
  } catch (e) {
    meetings = [];
  }
  // let eventsData = await fetch(
  //   "http://localhost:3000/api/encounters/customer/" + params.id
  // );
  // let events = await eventsData.json();
  return (
    <SpawnHeadband
      title={params.id}
      elemRight={
        <div className="flex">
          <a href="/customers">
            <button className="ml-4 bg-white text-[#2263b3] py-2 px-2 rounded text-sm flex items-center">
              <ArrowLeftIcon className="h-6 w-6 mr-2" />
              <p>Back</p>
            </button>
          </a>
        </div>
      }
    >
      <div className="flex flex-wrap gap-2">
        <div className="flex-col border bg-white">
          <div className="border-b items-center text-center justify-center p-2">
            <img
              alt="Image of user"
              src="https://randomuser.me/api/portraits"
              className="h-8 w-8 rounded-full"
            />
            <p>profile name</p>
          </div>
          <div className="border-b flex flex-auto justify-center p-2 gap-2">
            <EnvelopeIcon aria-hidden="true" className="h-6 w-6" />
            <BookmarkIcon aria-hidden="true" className="h-6 w-6" />
          </div>
          <div className="border-b flex justify-center p-2 gap-2">
            <div className="text-center">
              <p>23</p>
              <p>Total</p>
              <p>Encounters</p>
            </div>
            <div className="text-center">
              <p>20</p>
              <p>Positives</p>
            </div>
            <div className="text-center">
              <p>3</p>
              <p>In Progress</p>
            </div>
          </div>
          <div className="border-b p-2">
            <p>short detail</p>
            <p>User ID:</p>
            <p>Email</p>
            <p>Address</p>
            <p>Last Activity:</p>
            <p>Coach</p>
          </div>
        </div>
        <div className="flex-none border bg-white p-2 grow">
          <p>Recent Meeting</p>
          <MeetingTable meetings={meetings} />
          <p>Payment History</p>
          <PaymentHistoryTable paymentsHistory={payments} />
        </div>
      </div>
    </SpawnHeadband>
  );
}
