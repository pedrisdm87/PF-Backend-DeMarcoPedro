import userModel from '../models/user.model.js';

// Función para crear un nuevo usuario
export async function createUser(data) {
  try {
    const newUser = new userModel(data);
    return await newUser.save();
  } catch (error) {
    throw new Error(`Error al crear el usuario: ${error.message}`);
  }
}

// Función para buscar usuarios por correo electrónico
export async function findUserByEmail(email) {
  try {
    return await userModel.findOne({ email });
  } catch (error) {
    throw new Error(`Error al buscar usuario por correo electrónico: ${error.message}`);
  }
}


// Exporta las funciones para su uso en otros archivos
export { createUser, findUserByEmail };
