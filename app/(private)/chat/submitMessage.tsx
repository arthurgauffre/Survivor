"use server";

import { MessageFormState } from "@/app/lib/definitions";
import { redirect } from "next/dist/server/api-utils";

export async function SubmitMessage(
  state: MessageFormState,
  formData: FormData
): Promise<MessageFormState> {
  const customer_id: number = Number(formData.get("customer_id"));
  const employee_id: number = Number(formData.get("employee_id"));
  const messageSend: string = formData.get("messageSend") as string;
  const date: string = formData.get("date") as string;
  const senderId: number = Number(formData.get("senderId"));

  console.log("customer_id", customer_id);
  console.log("employee_id", employee_id);
  console.log("senderId", senderId);

  const accessToken: string = formData.get("accessToken") as string;

  console.log("accessToken", accessToken);
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

  return state;
}
