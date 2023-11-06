import productModel from './models/product.model.js';

export const getProductsFromDB = async (filterOptions, paginateOptions) => {
  try {
    const result = await productModel.paginate(filterOptions, paginateOptions);
    return result;
  } catch (err) {
    throw err; 
  }
};


export const getProductByIDFromDB = async (id) => {
  try {
    const result = await productModel.findById(id).lean().exec();
    return result;
  } catch (err) {
    throw err; 
  }
};



export const deleteProductByIDFromDB = async (id) => {
  try {
    const result = await productModel.findByIdAndDelete(id);
    return result;
  } catch (err) {
    throw err;
  }
};

export const updateProductInDB = async (id, data) => {
  try {
    const result = await productModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    return result;
  } catch (err) {
    throw err;
  }
};


export const createProductInDB = async (productData) => {
  try {
    const result = await productModel.create(productData);
    return result;
  } catch (err) {
    throw err; 
  }
};