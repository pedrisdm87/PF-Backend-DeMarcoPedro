import { Router } from "express"
import { getProducts } from "../controllers/product.controller.js"
import { getProductsFromCart } from "../controllers/cart.controller.js"
import { PORT } from '../app.js'
import { publicRoutes } from '../middlewares/auth.middleware.js'
import { getProductsViewRouterController, realTimeProductsVRController, cartViewRouterController } from "../controllers/views.controller.js"

const router = Router()

router.get('/', getProductsViewRouterController)

router.get('/realTimeProducts', realTimeProductsVRController)

router.get('/:cid', cartViewRouterController)

export default router