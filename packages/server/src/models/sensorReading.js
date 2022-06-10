const mongoose = require("mongoose");

const sensorReadingSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
    },
    time: {
      type: Date,
      default: Date.now,
    },
    sensorId: {
      type: String,
      ref: "Sensor",
    },
    machineId: {
      type: String,
      ref: "Machine",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SensorReading", sensorReadingSchema);
