import { Router } from "express"
import { getProducts } from "../controllers/product.controller.js"
import { getProductsFromCart } from "../controllers/cart.controller.js"
import config from "../config/config.js"
import { publicRoutes, privateRoutes } from '../middlewares/auth.middleware.js'
import { getProductsViewRouterController, realTimeProductsVRController, cartViewRouterController } from "../controllers/views.controller.js"
import { handlePolicies } from "../middlewares/auth.middleware.js"


const router = Router()

router.get('/', handlePolicies(['USER', 'ADMIN']), getProductsViewRouterController)

router.get('/realTimeProducts', handlePolicies(['USER', 'ADMIN']), realTimeProductsVRController)

router.get('/:cid', handlePolicies(['USER', 'ADMIN']), cartViewRouterController)

export default router