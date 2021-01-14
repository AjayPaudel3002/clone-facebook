const mongoose = require("mongoose");
const Schema = require(mongoose.Schema);

const GroupMessageSchema = new Schema({
  from: { type: String, ref: "User", required: true },
  messages: { content: String, image: String, video: String },
  createdAt: String,
});

module.exports = mongoose.model("GroupMessage", GroupMessageSchema);
