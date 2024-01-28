import { Router } from 'express'
import productModel from '../dao/models/product.model.js'
import cartModel from "../dao/models/cart.model.js"
import { createCartController, getCartByIdController, updatedCartController, deleteProductFromCartController, updatedCartDataController, updatedCartController1, deleteCartController, purchaseController } from '../controllers/cart.controller.js'
import { handlePolicies } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/:cid', handlePolicies(['USER']), getCartByIdController)

router.post('/', createCartController)

router.post('/:cid/product/:pid', handlePolicies(['USER']), updatedCartController)

router.put('/:cid', handlePolicies(['USER']), updatedCartDataController)

router.put('/:cid/product/:pid', handlePolicies(['USER']), updatedCartController1)

router.delete('/:cid/product/:pid', handlePolicies(['USER']), deleteProductFromCartController)

router.delete('/:cid', deleteCartController)

router.get('/:cid/purchase', purchaseController)



export default router