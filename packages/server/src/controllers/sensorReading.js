const SensorReading = require("../models/sensorReading");
const Sensor = require("../models/sensor");
const Machine = require("../models/machine");

exports.createSensorReading = async (req, res) => {
  const { value, unit, time, sensorId } = req.body;

  const sensorReading = await SensorReading({
    value,
    unit,
    time,
    sensorId,
  });
  await sensorReading.save();
  res.json({ success: true, sensorReading });

  const sensor = await Sensor.findOne({ id: sensorId });

  if (sensor.upperThresholdValue && value > sensor.upperThresholdValue) {
    await Machine.findOneAndUpdate(
      { id: sensor.machineId },
      { $set: { status: "Warning" } }
    );
  }

  if (sensor.lowerThresholdValue && value < sensor.lowerThresholdValue) {
    await Machine.findOneAndUpdate(
      { id: sensor.machineId },
      { $set: { status: "Warning" } }
    );
  }

  await Sensor.findOneAndUpdate({ id: sensorId }, { currentValue: value });
};

exports.getAllSensorReadings = async (req, res, next) => {
  try {
    const sensorReadings = await SensorReading.find();

    return res.status(200).json({
      success: true,
      count: sensorReadings.length,
      data: sensorReadings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
