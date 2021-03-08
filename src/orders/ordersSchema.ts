import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
  items: {
    type: Array,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  total: Number,
  paymentStatus: String,
  status: String,
  active: {
    type: Boolean,
    default: true,
  },
})

export default model('Product', orderSchema)
