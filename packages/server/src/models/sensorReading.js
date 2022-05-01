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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sensor",
  },
});

module.exports = mongoose.model("SensorReading", sensorReadingSchema);
