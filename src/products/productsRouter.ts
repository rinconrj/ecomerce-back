import { Router } from 'express'
import * as controller from './productsController'
import { token } from '../middlewares/authWare'

Router()
  .get('/id/:id', controller.getById)
  .get('/?', controller.getByFilter)
  .post('/register', token, controller.addProduct)
  .put('/update', token, controller.updateProduct)
  .patch('/delete/:id', token, controller.removeProduct)
