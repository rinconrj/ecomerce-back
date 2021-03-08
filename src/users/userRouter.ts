import { Router } from 'express'
import * as controller from './userController'
import { token } from '../middlewares/authWare'

export default Router()
  .get('/login', controller.login)
  .post('/register', controller.registerUser)
  .put('/update', token, controller.updateUser)
  .patch('/delete/:id', token, controller.deleteUser)
