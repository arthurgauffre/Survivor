"use client";

import "./../../component/table.css";
import PaymentMethod from "../../component/PaymentMethod";
import React from "react";
import {
  EnvelopeIcon,
  BookmarkIcon,
  StarIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as BlackStarIcon } from "@heroicons/react/24/solid";
import SpawnHeadband from "../../component/SpawnHeadband";

const meetings = [
  {
    id: 1,
    customer_id: 17,
    date: "2023-12-21",
    rating: 2,
    comment: "A very good moment!",
    source: "school",
  },
  {
    id: 2,
    customer_id: 17,
    date: "2023-12-21",
    rating: 2,
    comment: "A very good moment!",
    source: "school",
  },
  {
    id: 3,
    customer_id: 17,
    date: "2023-12-21",
    rating: 2,
    comment: "A very good moment!",
    source: "school",
  },
  {
    id: 4,
    customer_id: 17,
    date: "2023-12-21",
    rating: 2,
    comment: "A very good moment!",
    source: "school",
  },
  {
    id: 5,
    customer_id: 17,
    date: "2023-12-21",
    rating: 2,
    comment: "A very good moment!",
    source: "school",
  },
];

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

function Rating(numberStar: number) {
  const rating = [];

  for (let i = 0; i < numberStar; i++) {
    rating.push(<BlackStarIcon key={i} className="h-4 w-4" />);
  }
  for (let i = numberStar; i < 5; i++) {
    rating.push(<StarIcon key={i} className="h-4 w-4" />);
  }
  return rating;
}

function MeetingTable({
  meetings,
}: {
  meetings: {
    id: number;
    customer_id: number;
    date: string;
    rating: number;
    comment: string;
    source: string;
  }[];
}) {
  return (
    <table>
      <tbody>
        <tr>
          <th>Date</th>
          <th>Rating</th>
          <th>Report</th>
          <th>Source</th>
        </tr>
        {meetings.map((meeting) => (
          <tr key={meeting.id}>
            <td>
              <span className="cell-header">Date:</span>
              <div className="text-[#1267c5]">
                {new Date(meeting.date).toDateString()}
              </div>
            </td>
            <td>
              <span className="cell-header">Rating:</span>
              <div className="flex">
                {Rating(meeting.rating).map((star) => star)}
              </div>
            </td>
            <td>
              <span className="cell-header">Report:</span> {meeting.comment}
            </td>
            <td>
              <span className="cell-header">Source:</span> {meeting.source}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PaymentHistoryTable({
  paymentsHistory,
}: {
  paymentsHistory: {
    id: number;
    date: string;
    payment_method: string;
    amount: number;
    comment: string;
  }[];
}): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Payment Method</th>
          <th>Amount</th>
          <th>Commit</th>
        </tr>
      </thead>
      <tbody>
        {paymentsHistory.map((payment) => (
          <tr key={payment.id}>
            <td>
              <span className="cell-header">Date:</span>
              <div className="text-[#1267c5]">
                {new Date(payment.date).toDateString()}
              </div>
            </td>
            <td>
              <span className="cell-header">Payment Method:</span>
              <PaymentMethod payment={payment.payment_method} />
            </td>
            <td>
              <span className="cell-header">Amount:</span> {payment.amount}
            </td>
            <td>
              <span className="cell-header">Commit:</span> {payment.comment}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Page({ params }: { params: { id: string } }) : JSX.Element {
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
