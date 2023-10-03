import { Router } from "express";
import productModel from "../dao/models/product.model.js";
import { PORT } from "../app.js";

const router = Router();

export const getProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const filterOptions = {};
    if (req.query.stock) filterOptions.stock = req.query.stock;
    if (req.query.category) filterOptions.category = req.query.category;
    const paginateOptions = { lean: true, limit, page };
    if (req.query.sort === "asc") paginateOptions.sort = { price: 1 };
    if (req.query.sort === "desc") paginateOptions.sort = { price: -1 };
    const result = await productModel.paginate(filterOptions, paginateOptions);

    let prevLink;
if (!req.query.page) {
  prevLink = `http://${req.hostname}:${PORT}${req.originalUrl}?&page=${result.prevPage}`;
} else {
  const modifiedUrl = req.originalUrl.includes('page=')
    ? req.originalUrl.replace(/page=\d+/, `page=${result.prevPage}`)
    : `${req.originalUrl}?page=${result.prevPage}`;
  prevLink = `http://${req.hostname}:${PORT}${modifiedUrl}`;
}

let nextLink;
if (!req.query.page) {
  nextLink = `http://${req.hostname}:${PORT}${req.originalUrl}?&page=${result.nextPage}`;
} else {
  const modifiedUrl = req.originalUrl.includes('page=')
    ? req.originalUrl.replace(/page=\d+/, `page=${result.nextPage}`)
    : `${req.originalUrl}?&page=${result.nextPage}`;
  nextLink = `http://${req.hostname}:${PORT}${modifiedUrl}`;
}


    return {
      statusCode: 200,
      response: {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? prevLink : null,
        nextLink: result.hasNextPage ? nextLink : null,
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      response: { status: "error", error: err.message },
    };
  }
};

router.get("/", async (req, res) => {
  const result = await getProducts(req, res);
  res.status(result.statusCode).json(result.response);
});

router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const result = await productModel.findById(id).lean().exec();
    if (result === null) {
      return res.status(404).json({ status: "error", error: "Not found" });
    }
    res.status(200).json({ status: "success", payload: result });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const result = await productModel.create(product);
    const products = await productModel.find().lean().exec();
    req.io.emit("updatedProducts", products);
    res.status(201).json({ status: "success", payload: result });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const data = req.body;
    const result = await productModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    if (result === null) {
      return res.status(404).json({ status: "error", error: "Not found" });
    }
    const products = await productModel.find().lean().exec();
    req.io.emit("updatedProducts", products);
    res.status(200).json({ status: "success", payload: result });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const result = await productModel.findByIdAndDelete(id);
    if (result === null) {
      return res.status(404).json({ status: "error", error: "Not found" });
    }
    const products = await productModel.find().lean().exec();
    req.io.emit("updatedProducts", products);
    res.status(200).json({ status: "success", payload: products });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

export default router;