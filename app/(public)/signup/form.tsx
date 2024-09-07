'use client';  // Client-side component

import { signUp } from '@/app/auth/auth';
import { useFormState, useFormStatus } from 'react-dom';

export default function SignUpForm() {
  const [state, action] = useFormState(signUp, undefined);

  return (
    <>
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <br/>
        <input id="name" name="name" placeholder="Name" />
        {state?.errors?.name && <p className="text-sm text-red-500">{state?.errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <br/>

        <input id="email" name="email" type="email" placeholder="test@example.com" />
        {state?.errors?.email && <p className="text-sm text-red-500">{state?.errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br/>

        <input id="password" name="password" type="password" />
        {state?.errors?.password && <p className="text-sm text-red-500">{state?.errors.password}</p>}
      </div>
      <SignUpButton />
    </form>
    </>
  );
}

export function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="mt-2 w-full">
      {pending ? 'Submitting...' : 'Sing Up'}
    </button>
  );
}