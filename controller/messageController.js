const Message = require("../models/messages");
const User = require("../models/users");
const MessageReaction = require("../models/messageReactions");
const moment = require("moment");

exports.sendMessage = async (req, res, next) => {
  const from = req.user._id;
  const to = req.params.toUser;
  const { message, messageStatus } = req.body;
  try {
    const messageData = {
      from,
      to,
      message,
      messageStatus,
    };
    // console.log(Message);
    const msg = new Message({
      ...messageData,
      createdAt: moment.utc().format(),
    });

    const newMessage = await msg.save();
    const recentMsg = await newMessage
      .populate("from")
      .populate("to")
      .execPopulate();
    res.status(200).json({ data: recentMsg, message: "Added successfully" });
  } catch (error) {
    next(error);
  }
};

exports.editMessage = async (req, res, next) => {
  const from = req.user._id;
  const { messageId, messageStatus } = req.body;
  try {
    const data = {
      messageStatus,
    };

    const message = await Message.findOneAndUpdate(
      { _id: messageId, from: from },
      data,
      { new: true }
    );
    res.status(200).json({ message: "Message status changed" });
  } catch (error) {
    res.send(error);
  }
};

exports.getAllMessages = async (req, res) => {
  const from = req.user._id;
  const to = req.params.toUser;

  try {
    const allMsg = await Message.find({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    })
      .populate("from")
      .populate("to")
      .populate("reactors")
      .sort({ createdAt: 1 });
    res.status(200).json({ data: allMsg });
  } catch (error) {
    res.send(error);
  }
};

exports.deleteForMe = async (req, res, next) => {
  const { deleteForMe, messageId } = req.body;

  const data = {
    deleteForMe,
  };

  try {
    const msg = await Message.findByIdAndUpdate(messageId, data, {
      new: true,
    });
    res.status(200).json({ message: "Successfully deleted", msg: msg });
  } catch (error) {
    next(error);
  }
};

exports.deleteForEveryone = async (req, res, next) => {
  const { messageId } = req.body;
  const data = {
    deleteForEveryone: true,
  };

  try {
    const msg = await Message.findByIdAndUpdate(messageId, data, {
      new: true,
    });
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
};

exports.addMessageReactions = async (req, res, next) => {
  console.log(req.params);
  const { type } = req.body;
  const { messageId } = req.params;
  const newReaction = new MessageReaction({
    ...req.body,
    type,
    message: messageId,
    reactor: req.user._id,
  });
  try {
    const isReactorAvailable = await MessageReaction.findOne({
      message: messageId,
      reactor: req.user._id,
    });
    // console.log(isReactorAvailable);
    if (!isReactorAvailable) {
      const savedReactions = await newReaction.save();
      const AddReactionsToPost = await Message.findByIdAndUpdate(
        { _id: messageId },
        { $push: { reactors: savedReactions } },
        { new: true }
      );
      await savedReactions.populate("reactor").execPopulate();
      res.status(200).json(savedReactions);
    } else {
      res.status(200).json({ data: "Already Liked the post" });
    }
    // res.status(200);
  } catch (error) {
    next(error);
  }
};

exports.deleteMessageReactions = async (req, res) => {
  const { messageId } = req.params.messageId;
  // console.log(postId, req.user._id);
  try {
    const reactionsId = await MessageReaction.findOne(
      { message: messageId, reactor: req.user._id },
      "_id"
    );
    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        $pull: { reactors: { $in: [reactionsId] } },
      },
      { new: true }
    );
    // console.log(post);
    res.status(200).json("succesfully deleted");
  } catch (error) {
    res.send(error);
  }
};
