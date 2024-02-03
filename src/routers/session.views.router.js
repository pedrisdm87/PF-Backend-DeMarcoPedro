import { Router } from "express";
import { privateRoutes, publicRoutes } from "../middlewares/auth.middleware.js";
import {
  sessionRegisterController,
  sessionForgottenPasswordController,
  sessionLoginController,
  sessionProfileController,
} from "../controllers/sessionViews.controller.js";

const router = Router();

router.get("/register", sessionRegisterController);

router.get("/forgottenpassword", sessionForgottenPasswordController);

router.get("/", sessionLoginController);

router.get("/current", publicRoutes, sessionProfileController);

export default router;
