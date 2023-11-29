import productModel from './models/product.model.js';


const productDAO = { 

getProductsFromDB : async (filterOptions, paginateOptions) => {
  try {
    const result = await productModel.paginate(filterOptions, paginateOptions);
    return {
      statusCode: 200,
      response: {
          status: 'success', payload: result
      }
  }

} catch (error) {
  return {
      statusCode: 500,
      response: {
          status: 'error', error: error.message
      }
  }
}
},



getProductByIDFromDB : async (id) => {
  try {
    const result = await productModel.findById(id).lean().exec();
    if (!result || result === null) return {
      statusCode: 404,
      response: { status: 'error', error: 'Product does not exists' }
  }
  return {
      statusCode: 200,
      response: { status: 'success', payload: result }
  }
} catch (error) {

  return {
      statusCode: 500,
      response: { status: 'success', error: error.message }
  }
}
},



deleteProductByIDFromDB : async (id) => {
  try {
    const result = await productModel.findByIdAndDelete(id);
    if (!result) return {
      statusCode: 400,
      response: { status: 'error', error: 'The product could not be deleted' }
  }
  return {
      statusCode: 200,
      response: { status: 'success', payload: result }
  }
} catch (err) {
  return {
      statusCode: 500,
      response: { status: 'error', error: err.message }
  }
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
  return {
      statusCode: 200,
      response: { status: 'success', payload: result }
  }
} catch (err) {
  return {
      statusCode: 500,
      response: { status: 'success', error: err.message }
  }
}
},


createProductInDB : async (productData) => {
  try {
    const result = await productModel.create(productData);
    if (!result) return {
      statusCode: 400,
      response: { status: 'error', error: 'The product could not be added' }
  }
  return {
      statusCode: 201,
      response: { status: 'success', payload: result }
  }
} catch (err) {
  return {
      statusCode: 500,
      response: { status: 'error', error: err.message }
  }
}
},

}

export default productDAO ;