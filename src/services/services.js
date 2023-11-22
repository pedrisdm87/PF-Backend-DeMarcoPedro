import CartRepository from './cart.repository.js'
import cartDAO from '../dao/cart.dao.js'
import ProductRepository from './product.repository.js'
import productDAO from '../dao/product.dao.js'
import UserRepository from "./user.repository.js";
import userDAO from '../dao/user.dao.js';



export const CartService = CartRepository(cartDAO)
export const ProductService = ProductRepository(productDAO)
export const UserService = UserRepository(userDAO);