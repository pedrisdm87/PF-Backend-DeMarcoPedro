import { Router } from 'express'
import productModel from '../dao/models/product.model.js'
import cartModel from "../dao/models/cart.model.js"
import { createCartController, getCartByIdController, updatedCartController, deleteProductFromCartController, updatedCartDataController, updatedCartController1, deleteCartController, purchaseController } from '../controllers/cart.controller.js'

const router = Router()

router.get('/:cid', getCartByIdController)

router.post('/', createCartController)

router.post('/:cid/product/:pid', updatedCartController)

router.put('/:cid', updatedCartDataController)

router.put('/:cid/product/:pid', updatedCartController1)

router.delete('/:cid/product/:pid', deleteProductFromCartController)

router.delete('/:cid', deleteCartController)

router.get('/:cid/purchase', purchaseController)



export default router