'use server'
import { logout } from '@/app/auth/auth';

export default async function Page() {
  await logout();
}
