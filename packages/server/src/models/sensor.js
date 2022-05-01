const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
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
  upperThreshold: {
    value: {
      type: Number,
    },
    durationInMinutes: {
      type: Number,
    },
  },
  lowerThreshold: {
    value: {
      type: Number,
    },
    durationInMinutes: {
      type: Number,
    },
  },
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
  },
});

module.exports = mongoose.model("Sensor", sensorSchema);
