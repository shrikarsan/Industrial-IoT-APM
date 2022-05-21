const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  purchasedDate: {
    type: Date,
  },
  noOfSensors: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Good", "Warning", "Danger"],
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
