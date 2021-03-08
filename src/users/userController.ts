import { Request, Response, NextFunction } from 'express'
import * as service from './userService'
interface User {
  email: string
  phone: string
  password: string
  username: string
  birthday: string
  country: string
  address: string
}
export function login(req: Request, res: Response) {
  const { username, password }: { username: string; password: string } = req.body
  if (!username || !password) return res.status(400).json({ message: 'missing params' })
  service
    .autenticateUser({ username, password })
    .then((data) => {
      if (data.code) return res.status(data.code).json({ message: data.message })
      res.json(data)
    })
    .catch((err) => res.status(404).json({ message: err.message }))
}

export function registerUser(req: Request, res: Response) {
  const { email, phone, password, username, birthday, country, address, name } = req.body
  if (!email || !phone || !username || !address)
    return res.status(400).json({ message: 'missing params' })

  return service
    .createUser({
      name,
      email,
      phone,
      password,
      username,
      birthday,
      country,
      address,
    })
    .then(() => res.json({ message: `Validation date send to email` }))
    .catch((err) => res.status(404).json(err))
}

export function updateUser(req: Request, res: Response) {
  const { body } = req
  const { user }: { user: string } = req.headers
  service
    .updateUser(body, user)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json(err))
}

export function deleteUser(req: Request, res: Response) {
  const { id }: { id: string } = req.params
  const { user }: { user: string } = req.headers
  service.deleteUser(id, user).then((data) => {
    if (data.code) return res.status(data.code).json({ message: data.message })
    res.json(data)
  })
}
