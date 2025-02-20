'server-only';

import type { SessionPayload } from '@/app/lib/definitions';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { SessionPayload } from './definitions';

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1hr')
        .sign(key);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: number, role: string, accessToken: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ userId, role, expiresAt, accessToken });

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    redirect('/dashboard');
}

export async function verifySession(): Promise<{ isAuth: boolean; userId: number; role: string; accessToken: string }> {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        redirect('/login');
    }

    return { isAuth: true, userId: session.userId as number, accessToken: session.accessToken as string, role: session.role as string };
}

export async function updateSession() {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
}

export function deleteSession() {
    cookies().delete('session');
    redirect('/login');
}