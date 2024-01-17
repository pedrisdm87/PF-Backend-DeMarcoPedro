import UserModel from "../dao/models/user.model.js"
import passport from "passport";
import logger from "../utils/logger.js";

/*
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

*/



const sessionController = {};

sessionController.register = async (req, res) => {
  passport.authenticate('register', { failureRedirect: '/api/session/failRegister' })(req, res, () => {
    res.redirect('/');
  });
};

sessionController.failRegister = (req, res) => {
  res.send({ error: 'Passport register failed' });
};

sessionController.loginPage = (req, res) => {
  res.render('sessions/login');
};

sessionController.login = (req, res) => {
  passport.authenticate('login', { failureRedirect: '/api/session/failLogin' })(req, res, () => {
    if (!req.user) {
      return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
      cart: req.user.cart,
    };

    res.redirect('/products');
  });
};

sessionController.failLogin = (req, res) => {
  res.send({ error: 'Passport login failed' });
};

sessionController.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      res.status(500).render('error/base', { error: err });
    } else {
      res.redirect('/');
    }
  });
};
//Github
sessionController.github = passport.authenticate('github', { scope: ['user:email'] });

sessionController.githubCallback = async (req, res) => {
  passport.authenticate('github', { failureRedirect: '/login' })(req, res, () => {
    console.log('Callback: ', req.user);
    req.session.user = req.user;
    res.redirect('/products');
  });
};



export default sessionController;