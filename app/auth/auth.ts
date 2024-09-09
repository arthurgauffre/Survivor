'use server';

import {
  LoginFormState,
  LoginFormSchema,
  SignUpFormSchema,
} from '@/app/lib/definitions';
import { createSession, deleteSession } from '@/app/lib/session';
import { redirect } from 'next/dist/server/api-utils';

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
  await createSession("1", "user");
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

  let response: {
    access_token: string
  };
  try {
    const responseData: Response = await fetch('http://fastapi:8000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: 'jeanne.martin@soul-connection.fr', password: 'password' }),
    })
    response = await responseData.json()
  } catch (error) {
    return errorMessage;
  }
  console.log(response)
  // 2. Query the database for the user with the given email
  // const user = await db.query.users.findFirst({
  //   where: eq(users.email, validatedFields.data.email),
  // });

  // If user is not found, return early
  // if (!user) {
  //   return errorMessage;
  // }
  // 3. Compare the user's password with the hashed password in the database
  // const passwordMatch = await bcrypt.compare(
  //   validatedFields.data.password,
  //   user.password,
  // );

  // If the password does not match, return early
  // if (!passwordMatch) {
  //   return errorMessage;
  // }

  // 4. If login successful, create a session for the user and redirect
  // const userId = user.id.toString();
  await createSession("1", "user");
}

export async function logout() {
  deleteSession();
}
