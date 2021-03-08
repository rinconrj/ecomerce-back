import { Router } from 'express'
import * as controller from './ordersController'
import { tokenVerification } from '../middlewares/authWare'

Router()
  .get('/id/:id', controller.getById)
  .get('/?', controller.getByFilter)
  .post('/register', tokenVerification, controller.addOrder)
  .put('/update', tokenVerification, controller.updateOrder)
  .patch('/delete/:id', tokenVerification, controller.removeOrder)
