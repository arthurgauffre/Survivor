"use client"; // Client-side component

import { logout } from "@/app/auth/auth";
import { useFormState, useFormStatus } from "react-dom";

export default function LogoutForm() {
  const [state, action] = useFormState(logout, undefined);

  return (
    <>
      <form action={action}>
        <SignUpButton />
      </form>
    </>
  );
}

export function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="mt-2 w-full">
      {pending ? "Submitting..." : "Logout"}
    </button>
  );
}
