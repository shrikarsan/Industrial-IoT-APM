const mongoose = require("mongoose");

const sensorReadingSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
  },
  unit: {
    type: String,
  },
  sensor: {
    type: String,
    ref: "Sensor",
  },
});

module.exports = mongoose.model("SensorReading", sensorReadingSchema);
