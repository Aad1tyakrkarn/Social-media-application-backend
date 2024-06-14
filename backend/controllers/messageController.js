// messageController.js

// File for Testing purpose


// import MessageModel from "../models/messageModel.js";
const MessageModel = require("../models/messageModel.js")

// Function to add a new message
exports.addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  
  // Create a new message document
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });

  try {
    // Save the message to the database
    const result = await message.save();
    // Return the saved message
    res.status(200).json(result);
  } catch (error) {
    // Return an error response if something goes wrong
    res.status(500).json(error);
  }
};



// Function to get all messages for a specific chat
exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  
  try {
    // Find all messages in the database for the specified chat ID
    const result = await MessageModel.find({ chatId });
    // Return the messages
    res.status(200).json(result);
  } catch (error) {
    // Return an error response if something goes wrong
    res.status(500).json(error);
  }
};

