import userModel from "../dao/models/user.model.js";

// export default class UserDAO {
//   getAll = async () => await userModel.find().lean().exec();
//   getById = async (id) => await userModel.findById(id).populate().lean().exec();
//   create = async (data) => await userModel.create(data);
//   update = async (id, data) =>
//     await userModel.findByIdAndUpdate(id, data, { returnDocument: "after" });
//   delete = async (id) => userModel.findByIdAndDelete(id);
//   findOne = async (query) => await userModel.findOne(query);
// }


// ////////////------------------OBJETO--------------////////////

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

  update: async (id,data) => {
    try {
      const result = await userModel.findByIdAndUpdate(id, data, { returnDocument: "after" });
      return result;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const result = await userModel.findByIdAndDelete(id)
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
