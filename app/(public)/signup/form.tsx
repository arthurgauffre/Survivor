"use client";

import { signUp } from "@/app/auth/auth";
import { useFormState, useFormStatus } from "react-dom";

export default function SignUpForm() {
  const [state, action] = useFormState(signUp, undefined);

  return (
    <form action={action} method="POST" className="space-y-6">
      <div>
        <label
          htmlFor="Name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Name
        </label>
        <div className="mt-2">
          <input
            id="Name"
            name="Name"
            type="Name"
            required
            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="Surname"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Surname
        </label>
        <div className="mt-2">
          <input
            id="Surname"
            name="Surname"
            type="Surname"
            required
            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium leading-6 text-gray-900">
          Gender
        </p>
        <div>
          <fieldset>
            <div>
              <input
                id="maleRadioButton"
                name="genderButton"
                type="radio"
                value={"male"}
              />{" "}
              <label htmlFor="maleRadioButton">Male</label>
            </div>
            <div>
              <input
                id="femaleRadioButton"
                name="genderButton"
                type="radio"
                value={"female"}
              />{" "}
              <label htmlFor="femaleRadioButton">Female</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div>
        <label
          htmlFor="birthDate"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Birth Date
        </label>
        <div>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            required
            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Your description
        </label>
        <textarea
          id="desciption"
          name="description"
          rows={4}
          cols={40}
          className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            required
            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state?.errors.password}</p>
          )}
        </div>
      </div>

      <div>
        <SignUpButton />
      </div>
    </form>
  );
}

export function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="mt-2 w-full bg-indigo-600 rounded-md text-white p-1"
    >
      {pending ? "Submitting..." : "Register"}
    </button>
  );
}
