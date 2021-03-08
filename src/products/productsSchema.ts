import { model, Schema } from 'mongoose'

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },
  img: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    default: '',
  },
  details: String,
  videos: Array,
  stock: {
    type: Number,
  },
  code: String,
  category: String,
  departament: String,
  brand: String,
  price: Number,
  descount: Number,
  shipping: String,
  seller: String,
  condition: String,
  rating: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
})

export default model('Product', productSchema)
