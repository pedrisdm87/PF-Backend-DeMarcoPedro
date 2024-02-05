import userModel from "../dao/models/user.model.js";

const userDAO = {
  getAll: async () => {
    try {
      const result = await userModel.find().lean().exec();
      return result;
    } catch (err) {
      throw new Error("Error al obtener todos los usuarios");
    }
  },

  getById: async (id) => {
    try {
      const result = await userModel.findById(id).populate().lean().exec();
      return result;
    } catch (err) {
      throw new Error("Error al obtener el usuario por ID");
    }
  },

  create: async (data) => {
    try {
      const result = await userModel.create(data);
      return result;
    } catch (err) {
      throw new Error("Error al crear un nuevo usuario");
    }
  },

  update: async (id, data) => {
    try {
      const result = await userModel.findByIdAndUpdate(id, data, {
        returnDocument: "after",
      });
      return result;
    } catch (err) {
      throw new Error("Error al actualizar el usuario por ID");
    }
  },

  delete: async (id) => {
    try {
      const result = await userModel.findByIdAndDelete(id);
      return result;
    } catch (err) {
      throw new Error("Error al eliminar el usuario por ID");
    }
  },

  findOne: async (query) => {
    try {
      const result = await userModel.findOne(query);
      return result;
    } catch (err) {
      throw new Error("Error al buscar un usuario");
    }
  },
};

export default userDAO;


/*import userModel from "../dao/models/user.model.js";

const userDAO = {
  getAll: async () => {
    try {
      const result = await userModel.find().lean().exec();
      return result;
    } catch (err) {
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const result = await userModel.findById(id).populate().lean().exec();
      return result;
    } catch (err) {
      throw err;
    }
  },

  create: async (data) => {
    try {
      const result = await userModel.create(data);
      return result;
    } catch (err) {
      throw err;
    }
  },

  update: async (id, data) => {
    try {
      const result = await userModel.findByIdAndUpdate(id, data, {
        returnDocument: "after",
      });
      return result;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const result = await userModel.findByIdAndDelete(id);
      return result;
    } catch (err) {
      throw err;
    }
  },

  findOne: async (query) => {
    try {
      const result = await userModel.findOne(query);
    } catch (err) {
      throw err;
    }
  },
};

export default userDAO;
*/


