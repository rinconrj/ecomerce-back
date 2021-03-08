import { Request, Response } from 'express'
import * as service from './ordersService'
interface Order {
  items: true
  userId: true
  total: number
  paymentStatus: string
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params
  service.getById(id).then((data) => res.json(data))
}
export async function getByFilter(req: Request, res: Response) {
  const { query } = req
  service.getByFilter(query).then((data) => res.json(data))
}
export async function addOrder(req: Request, res: Response) {
  const { body } = req
  const { user } = req.headers
  service.addOrder(body, user).then((data) => res.json(data))
}
export async function updateOrder(req: Request, res: Response) {
  const { body } = req
  const { user } = req.headers
  service.updateOrder(body, user).then((data) => res.json(data))
}
export async function removeOrder(req: Request, res: Response) {
  const { id } = req.params
  const { user } = req.headers
  service.removeOrder(id, user).then((data) => res.json(data))
}
