import { z } from 'zod';

export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export type LoginFormState =
  | {
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string;
  }
  | undefined;


export type MessageFormState =
  | {
    errors?: {
      customer_id: number,
      employee_id: number,
      messageSend: string,
      date: string,
      senderId: number,
      accessToken: string,
    };
    message?: string;
  }
  | undefined;


  export type NewNoteFormState =
  | {
    errors?: {
      title: string,
      content: string,
      shared: boolean,
      userId: number,
      accessToken: string,
    };
    message?: string;
  }
  | undefined;

export type SessionPayload = {
  accessToken: string;
  userId: number;
  role: string;
  expiresAt: Date;
};