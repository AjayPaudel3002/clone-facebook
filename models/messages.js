const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: String,
  deleteForMe: { type: Schema.Types.ObjectId, ref: "User" },
  deleteForEveryone: { type: Boolean, default: false },
  reactors: { type: Schema.Types.ObjectId, ref: "MessageReaction" },
  messageStatus: { type: String, enum: ["sent", "delivered", "seen"] },
});

module.exports = mongoose.model("Message", messageSchema);
