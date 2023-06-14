'use client'

import { useTransition } from 'react'
import { login } from './Actions'

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = () => {
    startTransition(async () => {
      await login('abc')
    })
  }

  return (
    <form
      className="flex gap-2 border shadow-md rounded-md p-2"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2">
        <input type="checkbox" name="isAdmin" /> <span>Admin</span>
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {isPending ? 'Fazendo Login...' : 'Fazer Login'}
      </button>
    </form>
  )
}
