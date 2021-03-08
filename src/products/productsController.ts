import { Request, Response, NextFunction } from 'express'
import * as service from './productsService'
interface Products {
  email: string
  phone: string
  password: string
  username: string
  birthday: string
  country: string
  address: string
}

export function getById(req: Request, res: Response) {
  const { id } = req.params
  service.getById(id).then((data) => res.json(data))
}
export function getByFilter(req: Request, res: Response) {
  const { query } = req
  service.getByFilter(query).then((data) => res.json(data))
}
export function addProduct(req: Request, res: Response) {
  const { body } = req
  const { user } = req.headers
  service.addProduct(body, user).then((data) => res.json(data))
}
export function updateProduct(req: Request, res: Response) {
  const { body } = req
  const { user } = req.headers
  service.updateProduct(body, user).then((data) => res.json(data))
}
export function removeProduct(req: Request, res: Response) {
  const { id } = req.params
  const { user } = req.headers
  service.removeProduct(id, user).then((data) => res.json(data))
}
