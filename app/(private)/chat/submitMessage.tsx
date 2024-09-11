"use server";

import { MessageFormState } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import { router } from 'react';

const formatDate = () => {
  const date = new Date(Date.now());

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export async function SubmitMessage(
  state: MessageFormState,
  formData: FormData
): Promise<MessageFormState> {
  const customer_id: number = Number(formData.get("customer_id"));
  const employee_id: number = Number(formData.get("employee_id"));
  const messageSend: string = formData.get("messageSend") as string;
  const date: string = formatDate();
  const senderId: number = Number(formData.get("senderId"));

  const accessToken: string = formData.get("accessToken") as string;

  const response = await fetch("http://fastapi:8000/api/chat", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      customer_id: customer_id,
      employee_id: employee_id,
      message: messageSend,
      date: date,
      senderId: senderId,
    }),
  });

  return redirect("/chatrefresh");
}
