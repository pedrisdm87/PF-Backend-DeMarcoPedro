import CartRepository from './cart.repository.js'
import cartDAO from '../dao/cart.dao.js'
import ProductRepository from './product.repository.js'
import productDAO from '../dao/product.dao.js'


export const CartService = CartRepository(cartDAO)
export const ProductService = ProductRepository(productDAO)