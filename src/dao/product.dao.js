import productModel from './models/product.model.js';


const productDAO = { 

getProductsFromDB : async (filterOptions, paginateOptions) => {
  try {
    const result = await productModel.paginate(filterOptions, paginateOptions);
    return result;
  } catch (err) {
    throw err; 
}
},



getProductByIDFromDB : async (id) => {
  try {
    const result = await productModel.findById(id).lean().exec();
    if (!result || result === null) return {
      statusCode: 404,
      response: { status: 'error', error: 'Product does not exists' }
  }
  return result;
  } catch (err) {
    throw err;
}
},



deleteProductByIDFromDB : async (id) => {
  try {
    const result = await productModel.findByIdAndDelete(id);
    if (!result) return {
      statusCode: 400,
      response: { status: 'error', error: 'The product could not be deleted' }
  }
  return result;
  } catch (err) {
    throw err;
}
},

updateProductInDB : async (id, data) => {
  try {
    const result = await productModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });

  if (!result) return {
      statusCode: 400,
      response: { status: 'error', error: 'The product could not be updated' }
  }
  return result;
  } catch (err) {
    throw err;
}
},


createProductInDB : async (productData) => {
  try {
    const result = await productModel.create(productData);
    if (!result) return {
      statusCode: 400,
      response: { status: 'error', error: 'The product could not be added' }
  }
  return result;
  } catch (err) {
    throw err;
}
},

}

export default productDAO ;