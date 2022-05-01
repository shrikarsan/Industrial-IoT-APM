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
  lastMaintenance: {
    type: Date,
  },
  actuator: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      active: {
        type: Boolean,
      },
    },
  ],
});

module.exports = mongoose.model("Machine", machineSchema);
