'use server';

import {
  LoginFormState,
  LoginFormSchema,
  SignUpFormSchema,
} from '@/app/lib/definitions';
import { createSession, deleteSession } from '@/app/lib/session';
import { redirect } from 'next/dist/server/api-utils';
import { format } from 'path';

export async function signUp(
  state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  // 1. Validate form fields
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  // const { name, email, password } = validatedFields.data;

  // 3. Check if the user's email already exists
  // const existingUser = await db.query.users.findFirst({
  //   where: eq(users.email, email),
  // });

  // if (existingUser) {
  //   return {
  //     message: 'Email already exists, please use a different email or login.',
  //   };
  // }

  // Hash the user's password
  // const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Provider's API
  // const data = await db
  //   .insert(users)
  //   .values({
  //     name,
  //     email,
  //     password: hashedPassword,
  //   })
  //   .returning({ id: users.id });

  // const user = data[0];

  // if (!user) {
  //   return {
  //     message: 'An error occurred while creating your account.',
  //   };
  // }

  // 4. Create a session for the user
  // const userId = user.id.toString();
  await createSession(1, "user");
}

export async function login(
  state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  const errorMessage = { message: 'Invalid login credentials.' };

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  let responseRole: {
    role: string
    id: number
  } = {
    role: "",
    id: 0
  };

  let response: {
    access_token: string
  } = {
    access_token: ""
  };

  try {
    const responseData: Response = await fetch('http://fastapi:8000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: formData.get('email'), password: formData.get('password') }),
    })
    response = await responseData.json()
  } catch (error) {
    return errorMessage;
  }
  try {
    const responseData: Response = await fetch('http://fastapi:8000/api/role', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${response.access_token}`
      }
    })
    responseRole = await responseData.json()
  } catch (error) {
    return errorMessage;
  }
  await createSession(responseRole.id.toString(), responseRole.role.toLocaleLowerCase());
}

export async function logout() {
  deleteSession();
}