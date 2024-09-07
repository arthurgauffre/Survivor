"use client";

import { login } from "@/app/auth/auth";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            name="email"
            placeholder="test@example.com"
            type="email"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label htmlFor="password">Password</label>
            {/* <Link className="text-sm underline" href="#">
              Forgot your password?
            </Link> */}
          </div>

          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <LoginButton />
      </div>
    </form>
  );
}

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="mt-4 w-full">
      {pending ? "Submitting..." : "Login"}
    </button>
  );
}
