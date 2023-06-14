import { IUser } from '@/types/User'
import { Dispatch, SetStateAction, useState, useTransition } from 'react'
import { deleteUser, updateUser } from './Actions'

export function User({
  user,
  setUsers,
}: {
  user: IUser
  setUsers: Dispatch<SetStateAction<IUser[]>>
}) {
  const [isDeletePending, startDeleteTransition] = useTransition()
  const [isUpdatePending, startUpdateTransition] = useTransition()
  const [editable, setEditable] = useState<boolean>(false)
  const [name, setName] = useState<string>(user.name)
  const [job, setJob] = useState<string>(user.job || '')

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const isDeleted = await deleteUser(user.name)
      if (isDeleted) setUsers((prev) => prev.filter((u) => u.id !== user.id))
    })
  }

  const handleUpdate = () => {
    startUpdateTransition(async () => {
      const isUpdated = await updateUser({ id: user.id, name, job })
      if (isUpdated) setEditable(false)
    })
  }

  return (
    <tr>
      <td className="p-2">{user.id}</td>
      <td className="p-2">
        <input
          type="text"
          disabled={!editable}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td className="p-2">
        <input
          type="text"
          disabled={!editable}
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
      </td>
      <td className="flex gap-2 p-2">
        {editable ? (
          <button
            disabled={isUpdatePending}
            onClick={handleUpdate}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
          >
            {isUpdatePending ? 'Salvando...' : 'Salvar'}
          </button>
        ) : (
          <a
            onClick={() => setEditable(true)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
          >
            Editar
          </a>
        )}

        <button
          disabled={isDeletePending}
          onClick={handleDelete}
          className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
        >
          {isDeletePending ? 'Excluindo...' : 'Excluir'}
        </button>
      </td>
    </tr>
  )
}
