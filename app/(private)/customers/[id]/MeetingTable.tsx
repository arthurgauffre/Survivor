"use client";

import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as BlackStarIcon } from "@heroicons/react/24/solid";
import "@/app/components/table.css";

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

export default function MeetingTable({
  meetings,
}: {
  readonly meetings: {
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
              <span className="cell-header">Report:</span>
              {meeting.comment}
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
