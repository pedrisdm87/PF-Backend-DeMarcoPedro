import { Router } from "express";
import { privateRoutes, publicRoutes } from "../middlewares/auth.middleware.js"

const router = Router()

router.get('/register', async (req, res) => {
    res.render('sessions/register')
})

router.get('/forgottenpassword', async (req, res) => {
    res.render('sessions/forgottenpassword')
})

router.get('/', async (req, res) => {  
res.render('sessions/login')
})

router.get('/profile',publicRoutes, (req, res) => { 
    res.render('sessions/profile', req.session.user)
})

export default router