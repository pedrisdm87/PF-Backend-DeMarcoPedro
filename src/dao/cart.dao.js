/*import cartModel from "./models/cart.model.js";

const cartDAO = {
  getCartById: async (id) => {
    try {
      const result = await cartModel
        .findById(id)
        .populate("products.product")
        .lean();
      return result;
    } catch (err) {
      throw err;
    }
  },

  createCart: async () => {
    try {
      const result = await cartModel.create({});
      return result;
    } catch (err) {
      throw err;
    }
  },

  updateCart: async (id, data) => {
    try {
      const result = await cartModel.findByIdAndUpdate(id, data, {
        returnDocument: "after",
      });
      return result;
    } catch (err) {
      throw err;
    }
  },

  deleteCart: async (id) => {
    try {
      const result = await cartModel.findByIdAndDelete(id);
      return result;
    } catch (err) {
      throw err;
    }
  },
};

export default cartDAO;
*/
import cartModel from "./models/cart.model.js";

const cartDAO = {
  getCartById: async (id) => {
    try {
      const result = await cartModel.findById(id).populate("products.product").lean();
      if (!result) {
        throw new Error("Carrito no encontrado");
      }
      return result;
    } catch (err) {
      throw new Error("Error al obtener el carrito de la base de datos");
    }
  },

  createCart: async () => {
    try {
      const result = await cartModel.create({});
      return result;
    } catch (err) {
      throw new Error("Error al crear un nuevo carrito en la base de datos");
    }
  },

  updateCart: async (id, data) => {
    try {
      const result = await cartModel.findByIdAndUpdate(id, data, { returnDocument: "after" });
      if (!result) {
        throw new Error("No se pudo actualizar el carrito");
      }
      return result;
    } catch (err) {
      throw new Error("Error al actualizar el carrito en la base de datos");
    }
  },

  deleteCart: async (id) => {
    try {
      const result = await cartModel.findByIdAndDelete(id);
      if (!result) {
        throw new Error("No se pudo eliminar el carrito");
      }
      return result;
    } catch (err) {
      throw new Error("Error al eliminar el carrito de la base de datos");
    }
  },
};

export default cartDAO;
