const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  purchasedDate: {
    type: Date,
  },
  supervisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Machine", userSchema);
