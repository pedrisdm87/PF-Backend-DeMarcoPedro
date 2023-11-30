/*
import messageModel from "../dao/models/message.model.js";

export const chatController = async (req, res) =>{
    const messages = await messageModel.find().lean().exec()
    const user = req.user.username
    
    res.render('chat', {messages, user})
}

*/

// chatController.js
import * as chatDao from "../dao/chat.dao.js"
import logger from "../logger.js";

export const chatController = async (req, res) => {
  try {
    const messages = await chatDao.getAllMessages();
    const user = req.user.username;

    res.render('chat', { messages, user });
  } catch (error) {
    logger.error("Error en el controlador de chat:", error);
    res.status(500).send("Error interno del servidor");
  }
};
