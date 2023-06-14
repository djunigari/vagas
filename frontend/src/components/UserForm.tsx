'use client'

import { IUser } from '@/types/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addUser } from './Actions'

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .transform((name) => name.trim().replace(/\s+/g, ' '))
    .transform((name) =>
      name
        .split(' ')
        .map((world) => {
          return world.charAt(0).toUpperCase().concat(world.substring(1))
        })
        .join(' '),
    ),
  job: z
    .string()
    .transform((job) => job.trim().replace(/\s+/g, ' '))
    .transform((job) => job.charAt(0).toUpperCase().concat(job.substring(1))),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

interface UserFormProps {
  setUsers: Dispatch<SetStateAction<IUser[]>>
}

export function UserForm({ setUsers }: UserFormProps) {
  const [isPending, startTransition] = useTransition()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  const onSubmit = (data: any) => {
    startTransition(async () => {
      const user = await addUser(data)
      if (user) {
        setUsers((prev) => [...prev, user])
        reset()
      }
    })
  }

  return (
    <form
      className="space-y-6 border rounded-md shadow-md my-2 p-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2">
        <div className="w-1/2">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nome
          </label>
          <div className="mt-2">
            <input
              id="name"
              type="text"
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('name')}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
        </div>

        <div className="w-1/2">
          <label
            htmlFor="job"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Profissão
          </label>

          <div className="mt-2">
            <input
              id="job"
              type="text"
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('job')}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          disabled={isPending}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isPending ? 'Adicionando...' : 'Adicionar'}
        </button>
      </div>
    </form>
  )
}
