import userModel from './models/user.model.js';

export const registerUser = async (userData) => {
  try {
    // Lógica para registrar un usuario en la base de datos utilizando el modelo de usuario
    const result = await userModel.create(userData);
    return result;
  } catch (err) {
    throw err;
  }
};


export const getUserInfoFromDB = async (userId) => {
  try {
    const user = await UserModel.findById(userId).select('first_name last_name email role cart').lean().exec();
    return user;
  } catch (err) {
    throw err; // Manejo de errores
  }
};
