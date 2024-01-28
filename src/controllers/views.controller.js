import { getProducts } from "./product.controller.js";
import { getProductsFromCart } from "./cart.controller.js";
import * as cartDAO from "../dao/cart.dao.js";
import config from "../config/config.js";
import { CartService } from "../services/services.js";
import logger from "../utils/logger.js";
import { ProductService } from "../services/services.js";
import { publicRoutes } from "../middlewares/auth.middleware.js";

export const getProductsViewRouterController = async (req, res) => {
  const result = await getProducts(req, res);
  if (result.statusCode === 200) {
    const totalPages = [];
    let link;
    for (let index = 1; index <= result.response.totalPages; index++) {
      if (!req.query.page) {
        link = `http://${req.hostname}:${config.apiserver.port}${req.originalUrl}?&page=${index}`;
      } else {
        const modifiedUrl = req.originalUrl.replace(
          `page=${req.query.page}`,
          `page=${index}`
        );
        link = `http://${req.hostname}:${config.apiserver.port}${modifiedUrl}`;
      }
      totalPages.push({ page: index, link });
    }
    const user = req.session.user;
    logger.info(user);
    res.render("home", {
      user,
      products: result.response.payload,
      paginateInfo: {
        hasPrevPage: result.response.hasPrevPage,
        hasNextPage: result.response.hasNextPage,
        prevLink: result.response.prevLink,
        nextLink: result.response.nextLink,
        totalPages,
      },
    });
  } else {
    res
      .status(result.statusCode)
      .json({ status: "error", error: result.response.error });
  }
};

export const realTimeProductsVRController =
  (publicRoutes,
  async (req, res) => {
    try {
      const productId = req.params.pid;
      if (!productId) {
        const result = await ProductService.getProductsFromDB();
        res.render("realTimeProducts", { products: result });
      } else {
        const result = await ProductService.getProductByIDFromDB(productId);
        console.log('Producto a actualizar: ', result)
        res.render("realTimeProducts", { productToUpdate: result });
      }
    } catch (err) {
      res.status(500).json({ status: "error", error: err.message });
    }
  });

export const cartViewRouterController = async (req, res) => {
  try {
    const id = req.params.cid;
    const result = await CartService.getCartById(id);
    logger.info(result);
    if (!result) {
      return res
        .status(500)
        .send({ status: "error", error: "Internal Server Error" });
    } else {
      res.render("productsFromCart", { cart: result });
    }
  } catch (err) {
    logger.error(err);
    return res
      .status(500)
      .send({ status: "error", error: "Internal Server Error" });
  }
};
