import Products from './productsSchema'
import { isAdmin } from '../middlewares/authWare'

interface Product {
  _id: string
  productName: string
  img: string
  description: string
  details: string
  videos: string[]
  stock: number
  code: string
  category: string
  departament: string
  brand: string
  price: number
  descount: number
  shipping: string
  seller: string
  condition: string
}

export function getById(_id: string) {
  return Products.findOne({ _id }).lean()
}

export async function getByFilter(query) {
  return Products.find({ ...query, active: true })
    .lean()
    .exec()
}

export async function addProduct(
  {
    productName,
    img,
    description,
    stock,
    details,
    videos,
    code,
    category,
    departament,
    brand,
    price,
    descount,
    shipping,
  }: Product,
  userId: string
) {
  if (await isAdmin(userId)) {
    return Products.create({
      productName,
      img,
      description,
      stock,
      price,
      descount,
      details,
      videos,
      code,
      category,
      departament,
      brand,
      shipping,
    })
  }
  return { message: 'Necesitas permisos de administrador para esta funcion', code: 404 }
}

export async function updateProduct(
  {
    _id,
    productName,
    img,
    description,
    stock,
    price,
    descount,
    details,
    videos,
    code,
    category,
    departament,
    brand,
    shipping,
  }: Product,
  userId: string
) {
  const body = {
    img,
    description,
    stock,
    price,
    descount,
    details,
    videos,
    code,
    category,
    departament,
    brand,
    shipping,
    productName,
  }
  if (await isAdmin(userId))
    return Products.findOneAndUpdate({ _id }, body, { new: true }).lean().exec()
  return { message: 'Necesitas permisos de administrador para esta funcion', code: 404 }
}

export async function removeProduct(id: string, userId: string) {
  if (await isAdmin(userId))
    return Products.findOneAndUpdate({ _id: id }, { active: false })
      .lean()
      .then((data) => ({ message: `${data.name} inactivo` }))
  return { message: 'Necesitas permisos de administrador para esta funcion', code: 404 }
}
