import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", handlePolicies(["USER"]), (req, res) => {
  res.render("chat", { user: req.session.user.email });
});
export default router;
