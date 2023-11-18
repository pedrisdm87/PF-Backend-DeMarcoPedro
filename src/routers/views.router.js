import { Router } from "express"
import { getProducts } from "../controllers/product.controller.js"
import { getProductsFromCart } from "../controllers/cart.controller.js"
import config from "../config/config.js"
import { publicRoutes, privateRoutes } from '../middlewares/auth.middleware.js'
import { getProductsViewRouterController, realTimeProductsVRController, cartViewRouterController } from "../controllers/views.controller.js"
import { handlePolices } from "../middlewares/auth.middleware.js"


const router = Router()

router.get('/', handlePolices(['USER', 'ADMIN']), getProductsViewRouterController)

router.get('/realTimeProducts', handlePolices(['USER', 'ADMIN']), realTimeProductsVRController)

router.get('/:cid', handlePolices(['USER', 'ADMIN']), cartViewRouterController)

export default router