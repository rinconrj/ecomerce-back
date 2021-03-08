import { Schema, model } from 'mongoose'

const validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE', 'SELLER_ROLE'],
  message: '{VALUE} no es un rol valido',
}

const usuarioSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nombre es requerido'],
  },
  username: {
    type: String,
    required: [true, 'Nombre es requerido'],
  },
  email: {
    type: String,
    required: [true, 'Email es obligatorio'],
  },
  secundaryEmail: String,
  phone: {
    type: String,
  },
  confirmed: {
    email: { type: Boolean, default: false },
    phone: { type: Boolean, default: false },
  },
  password: {
    type: String,
    required: [true, 'Contraseña es obligatoria'],
  },
  birthday: String,
  country: String,
  address: String,
  referralLink: String,
  wishList: Array,
  role: {
    type: String,
    default: 'USER_ROLE',
    required: true,
    enum: validRoles,
  },
  active: {
    type: Boolean,
    default: true,
  },
  google: Object,
  facebook: Object,
})

export default model('User', usuarioSchema)
