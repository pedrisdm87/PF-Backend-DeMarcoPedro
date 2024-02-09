import UserPasswordModel from "../dao/models/user-password.model.js";

const userPasswordDAO = {
  create: async (email, token) => {
    console.log("Antes de crear el token en la base de datos");

    try {
      const createToken = await UserPasswordModel.create( email, token );
      console.log("Token creado exitosamente en la base de datos");
      return createToken;
    } catch (error) {
      console.error(
        "Error al crear el token de usuario en la base de datos:",
        error
      );
      throw new Error("Error al crear el token de usuario en la base de datos");
    }
  },

  findOne: async (token) => {
    try {
      const user = await UserPasswordModel.findOne(token);
      return user;
    } catch (err) {
      throw new Error(
        ("Error al buscar el token de usuario en la base de datos", err)
      );
    }
  },

  deleteOne: async (id) => {
    try {
      const updateToken = await UserPasswordModel.deleteOne({ _id: id });
      return updateToken;
    } catch (err) {
      throw new Error(
        ("Error al eliminar el token de usuario de la base de datos", err )
      );
    }
  },
};

export default userPasswordDAO;
