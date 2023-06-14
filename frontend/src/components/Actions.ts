'use server'

import { IUser } from '@/types/User'
import { cookies } from 'next/headers'

export async function getUsers(): Promise<IUser[]> {
  const res = await fetch('http://backend:3000/users', { cache: 'no-cache' })

  if (res.status === 200) {
    return res.json()
  }

  return []
}

export async function addUser(userData: {
  name: string
  job: string
}): Promise<IUser | null> {
  const res = await fetch('http://backend:3000/users', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'content-type': 'application/json' },
  })
  if (res.status === 200) return res.json()
  return null
}

export async function deleteUser(name: string): Promise<boolean> {
  const token = cookies().get('token')
  const res = await fetch('http://backend:3000/users', {
    cache: 'no-store',
    method: 'DELETE',
    body: JSON.stringify({ name }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token?.value}` || '',
    },
  })
  if (res.status === 200) return true
  return false
}

export async function updateUser(userData: {
  id?: number
  name: string
  job: string
}): Promise<boolean> {
  const token = cookies().get('token')
  const res = await fetch('http://backend:3000/users', {
    cache: 'no-store',
    method: 'PUT',
    body: JSON.stringify({
      id: userData.id,
      name: userData.name,
      job: userData.job,
    }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token?.value}` || '',
    },
  })
  if (res.status === 200) return true
  const data = await res.json()
  console.log(data.message)
  return false
}
