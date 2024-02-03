import { Router } from "express";
import {
  getProductsViewRouterController,
  realTimeProductsVRController,
  cartViewRouterController,
} from "../controllers/views.controller.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  handlePolicies(["USER", "ADMIN"]),
  getProductsViewRouterController
);

router.get(
  "/realTimeProducts",
  handlePolicies(["USER", "ADMIN"]),
  realTimeProductsVRController
); //  To Do: remove user permissions

router.get(
  "/realTimeProducts/:pid",
  handlePolicies(["USER", "ADMIN"]),
  realTimeProductsVRController
);

router.get(
  "/:cid",
  handlePolicies(["USER", "ADMIN"]),
  cartViewRouterController
);

export default router;
