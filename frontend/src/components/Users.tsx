'use client'

import { IUser } from '@/types/User'
import { useEffect, useState } from 'react'
import { getUsers } from './Actions'
import { User } from './User'
import { UserForm } from './UserForm'

export function Users() {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    getUsers().then((res) => setUsers(res))
  }, [])

  return (
    <div className="flex flex-col">
      <UserForm setUsers={setUsers} />
      <div className="border rounded shadow-md">
        <table className="w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="text-left p-2">Id</th>
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">Profissão</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {users.map((u, i) => (
              <User key={i} user={u} setUsers={setUsers} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
