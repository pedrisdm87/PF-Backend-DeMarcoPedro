import { privateRoutes, publicRoutes } from "../middlewares/auth.middleware.js"
import UserDTO from "../dto/usersDTO.js"


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
    const userDto = new UserDTO(req.session.user);
    res.render('sessions/profile', {userDto});
  };
  