import messageModel from "../dao/models/message.model.js";

export const chatController = async (req, res) =>{
    const messages = await messageModel.find().lean().exec()
    const user = req.user.username
    
    res.render('chat', {messages, user})
}