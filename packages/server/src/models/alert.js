const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  time: {
    type: Date,
  },
  description: {
    type: String,
  },
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sensor",
  },
  reading: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SensorReading",
  },
});

module.exports = mongoose.model("Alert", alertSchema);
