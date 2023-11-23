import { Router } from "express";
import productModel from "../dao/models/product.model.js";
import config from "../config/config.js";
import {productsResponse, getProductsbyIDController, createProductOnDBController, updateProductByIdController, deleteProductByIdController} from "../controllers/product.controller.js"
import { handlePolicies } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", handlePolicies(['USER', 'ADMIN']), productsResponse)

router.get("/:pid", handlePolicies(['USER', 'ADMIN']), getProductsbyIDController)

router.post("/", handlePolicies(['ADMIN']), createProductOnDBController) 

router.put("/:pid", handlePolicies(['ADMIN']), updateProductByIdController)

router.delete("/:pid", handlePolicies(['ADMIN']), deleteProductByIdController)

export default router;