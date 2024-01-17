/* import { Router } from "express";
import UserModel from "../dao/models/user.model.js"
import passport from "passport";
import { registerController, loginGithubController, failRegisterController, loginController, authenticationController, failLoginController, registerController2, logoutController} from "../controllers/session.controller.js"


const router = Router()

router.get('/failRegister',failRegisterController) // aca se crea la ruta de failRegister

//Sessions da a la vista de Login

router.get('/login', loginController) // aca se crea la ruta de login

router.get('/failLogin',failLoginController)

//Vista para registrar usuarios

router.get('/register', registerController2)


//Cerrar Session

router.get('/logout', logoutController)

//Github

router.get('/github', passport.authenticate('github', {scope:['user:email']}), (req, res) => { })  //email lo tomo como usuario


router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), loginGithubController)

//API para crear usuarios en la DB

router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failRegister'}), registerController) //este es el middleware

//API para login

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/failLogin'}), authenticationController)

export default router */

import { Router } from "express"
import sessionController from "../controllers/session.controller.js"

const router = Router()

router.post('/register', sessionController.register)
router.get('/failRegister', sessionController.failRegister)

router.get('/login', sessionController.loginPage)
router.post('/login', sessionController.login)
router.get('/failLogin', sessionController.failLogin)

router.get('/logout', sessionController.logout)

router.get('/github', sessionController.github)
router.get('/githubcallback', sessionController.githubCallback)

export default router