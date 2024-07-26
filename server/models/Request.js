const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  residentName: { type: String, required: true },
  residentAddress: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["pending", "seen", "action taken", "no response"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

requestSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Request", requestSchema);
