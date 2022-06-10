const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  time: {
    type: Date,
  },
  description: {
    type: String,
  },
  sensor: {
    type: String,
    ref: "Sensor",
  },
  machine: {
    type: String,
    ref: "Machine",
  },
  reading: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SensorReading",
  },
});

module.exports = mongoose.model("Alert", alertSchema);
