import cartModel from './models/cart.model.js'

const cartDao = {

getCartById : async (id) => {
    await cartModel.findById(id).populate('products.product').lean().exec();
},

createCart : async () => {
    await cartModel.create({});
},

updateCart : async (id, data) => {
    await cartModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
},

deleteCart : async (id) => {
    await cartModel.findByIdAndDelete(id);
}

}


    export default cartDao;