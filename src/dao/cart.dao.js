import cartModel from './models/cart.model.js'

// export const getCartById = async (id) => {
//     return await cartModel.findById(id).populate('products.product').lean();
// }

// export const createCart = async () => {
//     return await cartModel.create({});
// }

// export const updateCart = async (id, data) => {
//     return await cartModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
// }

// export const deleteCart = async (id) => {
//     return await cartModel.findByIdAndDelete(id);
// }

//------------------ PASO A OBJETO--------------------//

const cartDAO = {

    getCartById : async (id) =>{
        try {
            const result = await cartModel.findById(id).populate('products.product').lean();
            return result;
        } catch (err) {
            throw err;
        }
    },

    createCart : async () =>{
        try {
            const result = await cartModel.create({})
            return result;
        } catch (err) {
            throw err;
        }
    }, 

    updateCart : async (id, data) =>{
        try {
            const result = await cartModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
            return result;
        } catch (err) {
            throw err;
        }
    }, 

    deleteCart : async (id) =>{
        try {
            const result = await cartModel.findByIdAndDelete(id);
            return result;
        } catch (err) {
            throw err;
        }
    } 
}

export default cartDAO;