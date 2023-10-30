import productModel from '../models/product.model.js';

// Función para crear un nuevo producto
export async function createProduct(data) {
  try {
    const newProduct = new productModel(data);
    return await newProduct.save();
  } catch (error) {
    throw Error(`Error al crear el producto: ${error.message}`);
  }
}


// Exporta las funciones para su uso en otros archivos
export { createProduct };
