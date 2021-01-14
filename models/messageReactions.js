const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
  type: { type: String, required: true },
  reactor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: Schema.Types.ObjectId, ref: "Message", required: true },
});

module.exports = mongoose.model("MessageReaction", reactionSchema);
