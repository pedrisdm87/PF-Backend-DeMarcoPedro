//CODIGO DEFECTUOSO

/*
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

*/

import cartModel from '../dao/models/cart.model.js'


export const cartDAO = {
    findByIdAndPopulate: async (id) => {
        try {
            const result = await cartModel.findById(id).populate('products.product').lean();
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    
    createCart: async () => {
        try {
            const cartNew = await cartModel.create({});
            return cartNew;
        } catch (err) {
            throw new Error(err.message);
        }
    },
};

export const getCartByIdDAO = async () => {
    try{
        const getCartByID = await cartModel.findById(cid)
        return getCartByID
    }catch(err){
        return(err)
    }
}

export const updatedCartDAO = async (cid, update) => {
    try {
        const updatedCart = await cartModel.findByIdAndUpdate(cid, update, {new:true})
        return updatedCart
    } catch(err) {
        return(err)
    }
}