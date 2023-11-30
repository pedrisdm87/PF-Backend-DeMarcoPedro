import UserModel from "../dao/models/user.model.js"
import passport from "passport";
import logger from "../logger.js";


export const registerController = async (req, res) => {
    res.redirect('/');
  };

export const failRegisterController = async (req, res) => res.send({ error: 'Passport register failed' })

export const loginController = async (req, res) => {
    res.render('sessions/login')
}

export const authenticationController = async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        //age: req.user.age,
        role: req.user.role,
        cart: req.user.cart
    }
    res.redirect('/products')
}

export const failLoginController = async (req, res) => res.send({ error: 'Passport login failed' })

export const registerController2 = async (req, res) => {
    res.render('sessions/register')
}

export const logoutController = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            logger.error(err);
            res.status(500).render('errors/base', { error: err });
        } else {
            res.redirect('/');
        }
    });
};

export const loginGithubController = async(req, res) => {
    logger.info('Callback: ', req.user)
    req.session.user = req.user
    res.redirect('/products')
}