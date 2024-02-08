import { Router } from "express";
import sessionController from "../controllers/session.controller.js";

const router = Router();

router.post("/register", sessionController.register);
router.get("/failRegister", sessionController.failRegister);

router.get("/login", sessionController.loginPage);
router.post("/login", sessionController.login);
router.get("/failLogin", sessionController.failLogin);

router.get("/logout", sessionController.logout);

router.get("/github", sessionController.github);
router.get("/githubcallback", sessionController.githubCallback);

router.post('/forget-password', sessionController.forgetPass)
router.get('/verify-token/:token', sessionController.verifyToken)
router.post('/reset-password/:user', sessionController.resetPass)

export default router;
