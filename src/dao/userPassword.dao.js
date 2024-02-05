/*import UserPasswordModel from "../dao/models/user-password.model.js";

const userPasswordDAO = {
  create: async (email, token) => {
    const createToken = await UserPasswordModel.create(email, token);
    return createToken;
  },

  findOne: async (token) => {
    const user = await UserPasswordModel.findOne(token);
    return user;
  },

  deleteOne: async (id) => {
    const updateTicket = await UserPasswordModel.deleteOne(id);
  },
};

export default userPasswordDAO;
*/

import UserPasswordModel from "../dao/models/user-password.model.js";

const userPasswordDAO = {
  create: async (email, token) => {
    try {
      const createToken = await UserPasswordModel.create({ email, token });
      return createToken;
    } catch (err) {
      throw new Error("Error al crear el token de usuario en la base de datos");
    }
  },

  findOne: async (token) => {
    try {
      const user = await UserPasswordModel.findOne({ token });
      return user;
    } catch (err) {
      throw new Error("Error al buscar el token de usuario en la base de datos");
    }
  },

  deleteOne: async (id) => {
    try {
      const updateToken = await UserPasswordModel.deleteOne({ _id: id });
      return updateToken;
    } catch (err) {
      throw new Error("Error al eliminar el token de usuario de la base de datos");
    }
  },
};

export default userPasswordDAO;
