import productModel from "../dao/models/product.model.js";
import config from "../config/config.js";



export const getProducts = async (req, res) => { //from DB
    try {
      
      const { limit = 10, page = 1, stock, category, sort } = req.query;
  
      const filterOptions = { ...(stock && { stock }), ...(category && { category }) };
  
      const paginateOptions = { lean: true, limit, page };
              
      const result = await productModel.paginate(filterOptions, paginateOptions);
  
      let prevLink;
  if (!req.query.page) {
    prevLink = `http://${req.hostname}:${config.apiserver.port}${req.originalUrl}?&page=${result.prevPage}`;
  } else {
    const modifiedUrl = req.originalUrl.includes('page=')
      ? req.originalUrl.replace(/page=\d+/, `page=${result.prevPage}`)
      : `${req.originalUrl}?page=${result.prevPage}`;
    prevLink = `http://${req.hostname}:${config.apiserver.port}${modifiedUrl}`;
  }
  
  let nextLink;
  if (!req.query.page) {
    nextLink = `http://${req.hostname}:${config.apiserver.port}${req.originalUrl}?&page=${result.nextPage}`;
  } else {
    const modifiedUrl = req.originalUrl.includes('page=')
      ? req.originalUrl.replace(/page=\d+/, `page=${result.nextPage}`)
      : `${req.originalUrl}?&page=${result.nextPage}`;
    nextLink = `http://${req.hostname}:${config.apiserver.port}${modifiedUrl}`;
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

export const getProductsbyIDController = async (req, res) => {
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
  };

export const deleteProductByIdController = async (req, res) => {
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
  };

export const updateProductByIdController = async (req, res) => {
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
  };

export const createProductOnDBController = async (req, res) => {
    try {
      const product = req.body;
      const result = await productModel.create(product);
      const products = await productModel.find().lean().exec();
      req.io.emit("updatedProducts", products);
      res.status(201).json({ status: "success", payload: result });
    } catch (err) {
      res.status(500).json({ status: "error", error: err.message });
    }
  };

  export const productsResponse = async (req, res) => {
    const result = await getProducts(req, res);
    res.status(result.statusCode).json(result.response);
  };