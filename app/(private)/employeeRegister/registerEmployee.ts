"use client";
import {
  RegisterFormSchema,
  RegisterFormState,
} from '@/app/lib/definitions';
import { Description } from '@headlessui/react';
import { redirect } from 'next/dist/server/api-utils';



export async function registerEmployee(
  state: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  // 1. Validate form fields
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get('name'),
    surname: formData.get('surname'),
    gender: formData.get('gender'),
    birthdate: formData.get('birthdate'),
    description: formData.get('description'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  console.log('zefpok^,ezeokfzfĵo')
  console.log('validatedFields', validatedFields);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  redirect('/coaches');
}