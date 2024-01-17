import { Router } from "express";
import { checkoutGmail } from "../controllers/checkout.controller.js"

const router = Router()



router.post('/checkoutCorreo', checkoutGmail)
//router.post('/checkoutSms', checkoutSms)


export default router;