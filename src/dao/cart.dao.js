import cartModel from './models/cart.model.js'

const cartDao = {

getCartById : async (id) => {
    return await cartModel.findById(id).populate('products.product').lean();
},

createCart : async () => {
    return await cartModel.create({});
},

updateCart : async (id, data) => {
    return await cartModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
},

deleteCart : async (id) => {
    return await cartModel.findByIdAndDelete(id);
}

}


    export default cartDao;