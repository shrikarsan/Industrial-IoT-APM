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
    type: String,
    ref: "User",
  },
  lastMaintenance: {
    type: Date,
  },
  actuatorId: {
    type: String,
  },
  actuatorName: {
    type: String,
  },
});

module.exports = mongoose.model("Machine", machineSchema);
