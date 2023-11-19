import cartModel from './models/cart.model.js';

const cartDao = {
  getProductsFromCart: async (id) => {
    try {
      const result = await cartModel.findById(id).populate('products.product').lean();
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

  getCartById: async (id) => {
    try {
      const result = await cartModel.findById(id).populate('products.product').lean().exec();
      return result;
    } catch (err) {
      throw err;
    }
  },

  updateCart: async (id, data) => {
    try {
      const result = await cartModel.findByIdAndUpdate(id, data, { new: true });
      return result;
    } catch (err) {
      throw err;
    }
  },

  deleteProductFromCart: async (cid, productId) => {
    try {
      const result = await cartModel.findByIdAndUpdate(cid, { $pull: { products: { product: productId } } }, { new: true });
      return result;
    } catch (err) {
      throw err;
    }
  },

  updateCartData: async (cid, products) => {
    try {
      const cartToUpdate = await cartModel.findById(cid);
      cartToUpdate.products = products;
      const result = await cartModel.findByIdAndUpdate(cid, cartToUpdate, { returnDocument: 'after' });
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
  }
};

export default cartDao;