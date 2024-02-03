import { Router } from "express";
import { updatedUserRoleController } from "../controllers/users.controller.js";

const router = Router();

router.get("/premium/:email", updatedUserRoleController); //C

export default router;
