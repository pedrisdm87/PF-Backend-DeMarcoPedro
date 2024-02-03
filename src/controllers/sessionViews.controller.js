import UserDTO from "../dto/usersDTO.js";
import logger from "../utils/logger.js";

export const sessionRegisterController = async (req, res) => {
  res.render("sessions/register");
};

export const sessionForgottenPasswordController = async (req, res) => {
  res.render("sessions/forgottenpassword");
};

export const sessionLoginController = async (req, res) => {
  res.render("sessions/login");
};

export const sessionProfileController = async (req, res) => {
  const userDto = new UserDTO(req.session.user);
  logger.info(userDto);
  res.render("sessions/current", { userDto });
};
