// messageDao.js
import messageModel from "./models/message.model.js";

export const getAllMessages = async () => {
  return await messageModel.find().lean().exec();
};
