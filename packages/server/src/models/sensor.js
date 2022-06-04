const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  unit: {
    type: String,
  },
  upperThresholdValue: {
    type: Number,
  },
  lowerThresholdValue: {
    type: Number,
  },
  machineId: {
    type: String,
    ref: "Machine",
  },
});

module.exports = mongoose.model("Sensor", sensorSchema);
