import { Router } from "express";
import {
  productsResponse,
  getProductsbyIDController,
  createProductOnDBController,
  updateProductByIdController,
  deleteProductByIdController,
} from "../controllers/product.controller.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", handlePolicies(["USER", "ADMIN", "PREMIUM"]), productsResponse);

router.get(
  "/:pid",
  handlePolicies(["USER", "ADMIN", "PREMIUM"]),
  getProductsbyIDController
);

router.post("/", handlePolicies(["ADMIN"]), createProductOnDBController);

router.put(
  "/:pid",
  handlePolicies(["ADMIN", "PREMIUM"]),
  updateProductByIdController
);

router.delete(
  "/:pid",
  handlePolicies(["ADMIN", "PREMIUM"]),
  deleteProductByIdController
);

export default router;
