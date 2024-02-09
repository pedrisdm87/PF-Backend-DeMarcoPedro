import UserModel from "../dao/models/user.model.js";
import passport from "passport";
import logger from "../utils/logger.js";
import { UserService } from "../services/services.js";
import generarCodigo from "../utils/utils.js";
import { PassResetService } from "../services/services.js";
import { restorePasswordMail } from "../services/mail.service.js"
import { isValidPassword, createHash } from "../utils/utils.js"

const sessionController = {};

sessionController.register = async (req, res) => {
  passport.authenticate("register", {
    failureRedirect: "/api/session/failRegister",
  })(req, res, () => {
    res.redirect("/");
  });
};

sessionController.failRegister = (req, res) => {
  res.send({ error: "Passport register failed" });
};

sessionController.loginPage = (req, res) => {
  res.render("sessions/login");
};

sessionController.login = (req, res) => {
  passport.authenticate("login", { failureRedirect: "/api/session/failLogin" })(
    req,
    res,
    () => {
      if (!req.user) {
        return res
          .status(400)
          .send({ status: "error", error: "Invalid credentials" });
      }
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
        cart: req.user.cart,
      };

      res.redirect("/products");
    }
  );
};

sessionController.failLogin = (req, res) => {
  res.send({ error: "Passport login failed" });
};

sessionController.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error(err);
      res.status(500).render("error/base", { error: err });
    } else {
      res.redirect("/");
    }
  });
};
//Github
sessionController.github = passport.authenticate("github", {
  scope: ["user:email"],
});

sessionController.githubCallback = async (req, res) => {
  passport.authenticate("github", { failureRedirect: "/login" })(
    req,
    res,
    () => {
      logger.log("Callback: ", req.user);
      req.session.user = req.user;
      res.redirect("/products");
    }
  );
};

///////////////////////////////////////////////////////
sessionController.forgetPass = async (req, res) => {
  const email = req.body.email;
  const user = await UserService.findUser({ email });
  if (!user) {
    return res.status(404).json({ status: "error", error: "User not found" });
  }
  const token = generarCodigo(16);
  await PassResetService.createToken({ email, token });
  //aca llamo al mail service
  const emailResult = await restorePasswordMail(email, token);
  if (emailResult.success) {
    res.status(200).json({ status: "success", message: emailResult.message });
  } else {
    res.status(500).json({ status: "error", error: emailResult.error });
  }
};

sessionController.verifyToken = async (req, res) => {
  const userPassword = await PassResetService.findToken({
    token: req.params.token,
  });
  if (!userPassword) {
    return res
      .status(404)
      .json({
        status: "error",
        error: "Invalid Token / The token has expired",
      });
  }
  const user = userPassword.email;
  res.render("sessions/resetPassword", { user });
};

sessionController.resetPass = async (req, res) => {
  try {
    const user = await UserService.findUser({ email: req.params.user });
    //console.log('user en reset', user)
    const newPassword = req.body.newPassword;
    //comparacion pass
    const passwordMatch = isValidPassword(user, newPassword);
    if (passwordMatch) {
      return res
        .status(404)
        .json({ status: "error", message: "Contraseña igual a la anterior" });
    }
    await UserService.update(user._id, {
      password: createHash(newPassword),
    });
    await PassResetService.deleteToken(user._id);
    res.json({
      status: "success",
      message: "Se ha creado una nueva contraseña",
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

sessionController.exchangeRole = async (req, res) => {
  try {
    const id = req.params.uid;
    const user = await UserService.findById(id);
    logger.log("info de user", user);
    await UserService.findAndUpdate(req.params.uid, {
      role: user.role === "user" ? "premium" : "user",
    });
    res.render("sessions/profile");
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

export default sessionController;
