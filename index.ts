import { connect } from 'mongoose'
import App from './app'
require('dotenv').config()

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.emy4v.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const options = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }

App.listen(process.env.PORT, () => {
  try {
    connect(url, options, (err) => {
      if (err) throw err
      console.info('DB running')
    })
    require('./router').default()
    console.info(`Server Running on ${process.env.PORT}`)
  } catch (error) {
    console.warn(`Error loading module routes:  ${error}`)
  }
})
