const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  groupName: String,
  groupPic: String,
  createdAt: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  groupMessages: [
    {
      type: Schema.Types.ObjectId,
      ref: "GroupMessage",
    },
  ],
});

module.exports = mongoose.model("Group", GroupSchema);
