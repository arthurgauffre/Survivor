'use server';

import { MessageFormState } from "@/app/lib/definitions";

export async function SubmitMessage( state: MessageFormState,
  formData: FormData,
): Promise<MessageFormState>  {

  const customer_id: number = formData.get("customer_id") || 0;

  const accessToken: string = formData.get("accessToken") as string;

  const response = await fetch(
    "http://fastapi:8000/api/chat/",
    {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        customer_id: 1,
        employee_id: 2,
        message: "Hello",
        date: "2021-10-10",
        senderId: 1
      }),
    }
  );

  return await response.json();
}
