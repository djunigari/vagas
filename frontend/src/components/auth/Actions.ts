'use server'

import { cookies } from 'next/headers'

export async function login(username: string) {
  const res = await fetch('http://backend:3000/signin', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: { 'content-type': 'application/json' },
  })

  if (res.status === 200) {
    const data = await res.json()
    cookies().set('token', data.token)
  }
}
