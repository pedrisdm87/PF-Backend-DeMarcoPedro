import productModel from "./models/product.model.js";

const productDAO = {
  getProductsFromDB: async (filterOptions, paginateOptions) => {
    try {
      const result = await productModel.paginate(
        filterOptions,
        paginateOptions
      );
      return result;
    } catch (err) {
      throw new Error("Error al obtener productos de la base de datos");
    }
  },

  getProductByIDFromDB: async (id) => {
    try {
      const result = await productModel.findById(id).lean().exec();
      if (!result || result === null)
        return {
          statusCode: 404,
          response: { status: "error", error: "El producto no existe" },
        };
      return result;
    } catch (err) {
      throw new Error("Error al obtener el producto por ID desde la base de datos");
    }
  },

  deleteProductByIDFromDB: async (id) => {
    try {
      const result = await productModel.findByIdAndDelete(id);
      if (!result)
        return {
          statusCode: 400,
          response: {
            status: "error",
            error: "El producto no pudo ser eliminado",
          },
        };
      return result;
    } catch (err) {
      throw new Error("Error al eliminar el producto por ID desde la base de datos");
    }
  },

  updateProductInDB: async (id, data) => {
    try {
      const result = await productModel.findByIdAndUpdate(id, data, {
        returnDocument: "after",
      });

      if (!result)
        return {
          statusCode: 400,
          response: {
            status: "error",
            error: "El producto no pudo ser actualizado",
          },
        };
      return result;
    } catch (err) {
      throw new Error("Error al actualizar el producto en la base de datos");
    }
  },

  createProductInDB: async (productData) => {
    try {
      const result = await productModel.create(productData);
      if (!result)
        return {
          statusCode: 400,
          response: {
            status: "error",
            error: "El producto no pudo ser agregado",
          },
        };
      return result;
    } catch (err) {
      throw new Error("Error al crear el producto en la base de datos");
    }
  },
};

export default productDAO;
