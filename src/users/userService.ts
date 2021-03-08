import User from './userSchema'
import { encodePassword, validatePassword, encrypt, isAdmin, createToken } from '../middlewares/authWare'
import sendEmail from '../middlewares/sendEmail'

interface UserObject {
  email: string
  phone: string
  password: string
  username: string
  name: string
  birthday: string
  country: string
  address: string
}

export const createUser = async ({
  email,
  phone,
  password,
  username,
  name,
  birthday,
  country,
  address,
}: UserObject) => {
  const hashedPassword = encodePassword(password)
  return new User({
    email,
    phone,
    password: hashedPassword,
    username,
    name,
    birthday,
    country,
    address,
  })
    .save()
    .then(({ name, email }) => {
      if (email) {
        sendEmail([{ name, email }])
      }
    })
    .catch((e: string) => {
      throw Error(e)
    })
}

export const autenticateUser = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  const userDb = await User.findOne({
    $or: [{ email: username }, { username }],
    active: true,
  })
  if (userDb) {
    const isValidPassword = validatePassword(password, userDb.password)
    if (isValidPassword) {
      const token = createToken(encrypt(JSON.stringify({ _id: userDb._id }), String(userDb._id)))
      return {
        token,
        user: {
          name: userDb.name,
          username: userDb.username,
          email: userDb.email,
          phone: userDb.phone,
        },
      }
    }
    return { message: 'Contraseña o Usuario equivocado', code: 401 }
  }
  return { message: 'Email no registrado o sin validar', code: 404 }
}

export const updateUser = async (
  {
    address,
    secundaryEmail,
    wishList,
    name,
  }: {
    username: string
    address: string
    secundaryEmail: string
    wishList: string[]
    name: string
  },
  userId: string
) => {
  const updatedBody = {
    address,
    secundaryEmail,
    wishList,
    name,
  }
  return User.findOneAndUpdate({ _id: userId, active: true }, updatedBody, { new: true }).lean()
}

export const deleteUser = async (id: string, userId: string) => {
  if (await isAdmin(userId))
    return User.findOneAndUpdate({ _id: id }, { active: false })
      .lean()
      .then((data) => ({ message: `${data.name} deleted` }))
  return { message: 'Necesitas permisos de administrador para esta funcion', code: 404 }
}
