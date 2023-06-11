import { addViewsToUser } from '@/services/user/addViewsToUser.service'
import { createNewUser } from '@/services/user/createNewUser.service'
import { deleteUser } from '@/services/user/deleteUser.service'
import { findUserById } from '@/services/user/findUserById.service'
import { findUserByName } from '@/services/user/findUserByName.service'
import { getAllUsers } from '@/services/user/getAllUsers.service'
import { updateUser } from '@/services/user/updateUser.service'
import { Request, Response } from 'express'

export function getUser(req: Request, res: Response) {
  const name = (req.query.name as string)?.replace(/\s+/g, ' ').trim()

  if (!name) return res.status(404).send(`User not found`)

  const founded = findUserByName(name)

  if (!founded) return res.status(404).send(`User not found`)

  addViewsToUser(founded)

  return res.status(200).send(founded)
}

export function getUsers(req: Request, res: Response) {
  return res.status(200).send(getAllUsers())
}

export function userAccess(req: Request, res: Response) {
  const name = (req.query.name as string)?.replace(/\s+/g, ' ').trim()

  const founded = findUserByName(name)

  if (!founded) return res.status(404).send(`User not found`)

  return res
    .status(200)
    .send(`User ${founded.name} has ${founded.views} views.`)
}

export function create(req: Request, res: Response) {
  const name = (req.query.name as string)?.replace(/\s+/g, ' ').trim()
  const job = (req.query.job as string)?.replace(/\s+/g, ' ').trim()

  if (!name) return res.status(409).send(`Name can not be empty`)

  const founded = findUserByName(name)

  if (founded)
    return res.status(409).send(`User with name: ${name} already exist`)

  const user = createNewUser(name, job)

  return res.status(200).send(user)
}

export function update(req: Request, res: Response) {
  const id = parseInt(req.query.id as string)
  const name = (req.query.name as string)?.replace(/\s+/g, ' ').trim()
  const job = (req.query.job as string)?.replace(/\s+/g, ' ').trim()

  if (!name) return res.status(409).send(`Name can not be empty`)

  const founded = findUserByName(name)
  if (founded && founded.id !== id)
    return res.status(409).send(`User with name: ${name} already exist`)

  const user = findUserById(id)

  if (!user) return res.status(404).send(`User not found`)

  const updatedUser = updateUser(user, name, job)
  return res.status(200).send(`User updated: ${JSON.stringify(updatedUser)}`)
}

export function remove(req: Request, res: Response) {
  const name = (req.query.name as string)?.replace(/\s+/g, ' ').trim()

  const user = deleteUser(name)

  if (!user) return res.status(404).send(`User not found`)

  return res.status(200).send(`User deleted: ${JSON.stringify(user)}`)
}
