import productModel from "../dao/models/product.model.js";
import config from "../config/config.js";
import { ProductService } from "../services/services.js";


export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, stock, category, sort } = req.query;
    const filterOptions = { ...(stock && { stock }), ...(category && { category }) };
    const paginateOptions = { lean: true, limit, page };

    const result = await ProductService.getProductsFromDB(filterOptions, paginateOptions);

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
    
    const result = await ProductService.getProductByIDFromDB(id);

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

    const result = await ProductService.deleteProductByIDFromDB(id);

    if (result === null) {
      return res.status(404).json({ status: "error", error: "Not found" });
    }

    // Ahora, podemos llamar a una función del DAO para obtener la lista de productos actualizada
    const updatedProducts = await ProductService.getProductsFromDB();

    // Emitir una actualización al cliente o realizar otras acciones si es necesario
    req.io.emit("updatedProducts", updatedProducts);

    res.status(200).json({ status: "success", payload: updatedProducts });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

export const updateProductByIdController = async (req, res) => {
  try {
    const id = req.params.pid;
    const data = req.body;
    
    const result = await ProductService.updateProductInDB(id, data);
    
    if (result === null) {
      return res.status(404).json({ status: "error", error: "Not found" });
    }
    
    // Actualizar la lista de productos (mover esto a una función en el DAO)
    const products = await productModel.find().lean().exec(); //LUUUUUUUUUUU
    req.io.emit("updatedProducts", products);
    
    res.status(200).json({ status: "success", payload: result });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

export const createProductOnDBController = async (req, res) => {
  try {
    const product = req.body;

    // Llamar a la función del DAO para crear un producto
    const result = await ProductService.createProductInDB(product);

    // Recuperar la lista actualizada de productos 
    const products = await productModel.find().lean().exec();//LUUUUUUUUUUU
    
    // Emitir evento de actualización 
    req.io.emit("updatedProducts", products);

    res.status(201).json({ status: "success", payload: result });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

export const productsResponse = async (req, res) => {
  const result = await ProductService.getProducts(req, res);
  res.status(result.statusCode).json(result.response);
};

