import { Router } from "express";
import {updatedUserRoleController, deleteInactiveUsersController, getAllUsersController, deleteUserByIdController} from '../controllers/users.controller.js'
const router = Router();

router.get("/", getAllUsersController)
router.get("/premium/:email", updatedUserRoleController);
router.get("/premium/:uid", updatedUserRoleController)  //C
router.delete("/inactiveusers", deleteInactiveUsersController)  
router.delete("/:uid", deleteUserByIdController)

export default router;
