import { Router } from "express";
import { updatedUserRoleController } from "../controllers/users.controller.js";

const router = Router();

router.get("/premium/:email", updatedUserRoleController);
router.get("/premium/:id")  //C

export default router;
