import { Router } from "express";
import productModel from "../dao/models/product.model.js";
import config from "../config/config.js";
import {productsResponse, getProductsbyIDController, createProductOnDBController, updateProductByIdController, deleteProductByIdController} from "../controllers/product.controller.js"
import { handlePolicies } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", handlePolicies(['USER', 'ADMIN', 'PREMIUM']), productsResponse)

router.get("/:pid", handlePolicies(['USER', 'ADMIN', 'PREMIUM']), getProductsbyIDController)

router.post("/", handlePolicies(['ADMIN', 'PREMIUM', 'USER']), createProductOnDBController) 

router.put("/:pid", handlePolicies(['ADMIN', 'PREMIUM']), updateProductByIdController)

router.delete("/:pid", handlePolicies(['ADMIN', 'PREMIUM']), deleteProductByIdController)

export default router;