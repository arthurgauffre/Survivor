"use client";

import "@/app/components/table.css";
import PaymentMethod from "@/app/components/PaymentMethod";
import React from "react";

export default function PaymentHistoryTable({
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
              <span className="cell-header">Amount:</span> {payment.amount}.00 $
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
