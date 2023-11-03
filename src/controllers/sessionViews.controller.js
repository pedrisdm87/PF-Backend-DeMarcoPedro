import { privateRoutes, publicRoutes } from "../middlewares/auth.middleware.js"


export const sessionRegisterController = async (req, res) => {
    res.render('sessions/register')
}

export const sessionForgottenPasswordController = async (req, res) => {
    res.render('sessions/forgottenpassword')
}

export const sessionLoginController = async (req, res) => {
    res.render('sessions/login')
}

export const sessionProfileController = async (req, res) => { 
    res.render('sessions/profile', req.session.user)
}