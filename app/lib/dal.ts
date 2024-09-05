import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const verifySession = cache(async () => {
    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.userId) {
        redirect('/login')
    }

    return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null
    let data = await fetch('https://fastapi:8000/api/customers')
    let posts = await data.json()


    try {
        posts.map((post) => {
            if (post.id === session.userId) {
                return post
            }
        })
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})