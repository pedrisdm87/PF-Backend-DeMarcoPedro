import { Router } from "express";
import productModel from "../dao/models/product.model.js";
import { PORT } from "../app.js";
import {productsResponse, getProductsbyIDController, createProductOnDBController, updateProductByIdController, deleteProductByIdController} from "../controllers/product.controller.js"

const router = Router();

router.get("/", productsResponse)

router.get("/:pid", getProductsbyIDController)

router.post("/", createProductOnDBController) 

router.put("/:pid", updateProductByIdController)

router.delete("/:pid", deleteProductByIdController)

export default router;