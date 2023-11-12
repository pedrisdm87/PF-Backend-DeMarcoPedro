import cartModel from './models/cart.model.js'

export const getCartById = async (id) => {
    return await cartModel.findById(id).populate('products.product').lean();
}

export const createCart = async () => {
    return await cartModel.create({});
}

export const updateCart = async (id, data) => {
    return await cartModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
}

export const deleteCart = async (id) => {
    return await cartModel.findByIdAndDelete(id);
}

