import express from 'express'
import app from './app'
import userRoutes from './src/users/userRouter'
// import productRoutes from './src/products/productsRouter'

exports.default = () => {
  const router = express.Router()

  router.use(userRoutes)
  // router.use(productRoutes)
  app.use('/user', router)
  app.use('/product', router)
}
