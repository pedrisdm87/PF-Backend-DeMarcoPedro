import cartModel from '../models/cart.model.js'

// Función para crear un nuevo carrito
export async function createCart() {
  try {
    const newCart = new cartModel();
    return await newCart.save();
  } catch (error) {
    throw new Error(`Error al crear el carrito: ${error.message}`);
  }
}

// Función para obtener un carrito por su ID
export async function getCartById(cid) {
  try {
    return await cartModel.findById(cid);
  } catch (error) {
    throw new Error(`Error al obtener el carrito: ${error.message}`);
  }
}

// Otras funciones para agregar productos al carrito, actualizar la cantidad, eliminar productos, etc. (ideas a terminar)

// Exporta las funciones para su uso en otros archivos
export { createCart, getCartById };
