// File for Testing purpose



// import ChatModel from "../models/chatModel.js";
const ChatModel = require("../models/chatModel.js")

// import MessageModel from "../models/messageModel.js";
const MessageModel = require("../models/messageModel.js")

// exports.createChat = async (req, res) => {
//   const newChat = new ChatModel({
//     members: [req.body.senderId, req.body.receiverId],
//   });
//   try {
//     const result = await newChat.save();
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


exports.createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  // Check if both senderId and receiverId are provided
  if (!senderId || !receiverId) {
    return res.status(400).json({
      success: false,
      message: "SenderId and ReceiverId are required",
    });
  }

  const newChat = new ChatModel({
    members: [senderId, receiverId],
  });

  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const newMessage = new MessageModel({
    chatId,
    senderId,
    text,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await MessageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
