const mongoose = require("mongoose");

const channelNames = mongoose.Schema({
  name: { type: String, default: "" },
  category: { type: String, default: "" },
  image: { type: String, default: "default.png" },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fans: [
    {
      username: { type: String, default: "" },
      email: { type: String, default: "" },
    },
  ],
});

module.exports = mongoose.model("Channel", channelNames);
