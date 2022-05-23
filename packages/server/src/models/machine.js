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
  status: {
    type: String,
    enum: ["Good", "Warning", "Danger"],
  },
  purchasedDate: {
    type: Date,
  },
  noOfSensors: {
    type: Number,
    default: 0,
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
    },
  ],
});

module.exports = mongoose.model("Machine", machineSchema);
