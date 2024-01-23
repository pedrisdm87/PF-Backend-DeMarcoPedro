import { Router } from "express";
import { checkoutGmail } from "../controllers/checkout.controller.js"

const router = Router()



router.post('/checkoutCorreo', checkoutGmail)



export default router;