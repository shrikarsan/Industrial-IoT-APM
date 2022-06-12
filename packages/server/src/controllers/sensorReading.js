const SensorReading = require("../models/sensorReading");
const Sensor = require("../models/sensor");
const Machine = require("../models/machine");
const Alert = require("../models/alert");

exports.createSensorReading = async (req, res) => {
  const { value, unit, time, sensorId } = req.body;

  const sensor = await Sensor.findOne({ id: sensorId });

  const sensorReading = await SensorReading({
    value,
    unit,
    time,
    sensorId,
    machineId: sensor.machineId,
  });
  await sensorReading.save();
  res.json({ success: true, sensorReading });

  if (sensor.upperThresholdValue && value > sensor.upperThresholdValue) {
    const alert = await Alert({
      time: time,
      description: `Current reading ${value} ${unit} of sensor ${sensorId} has exceeded the upper threshold value of ${sensor.upperThresholdValue}`,
      sensor: sensorId,
      machine: sensor.machineId,
      reading: sensorReading._id,
    });
    await alert.save();

    await Machine.findOneAndUpdate(
      { id: sensor.machineId },
      { $set: { status: "Warning" } }
    );
  } else if (sensor.lowerThresholdValue && value < sensor.lowerThresholdValue) {
    const alert = await Alert({
      time: time,
      description: `Current reading ${value} ${unit} of sensor ${sensorId} is less than the lower threshold value of ${sensor.lowerThresholdValue}`,
      sensor: sensorId,
      machine: sensor.machineId,
      reading: sensorReading._id,
    });
    await alert.save();

    await Machine.findOneAndUpdate(
      { id: sensor.machineId },
      { $set: { status: "Warning" } }
    );
  } else {
    await Machine.findOneAndUpdate(
      { id: sensor.machineId },
      { $set: { status: "Good" } }
    );
  }

  await Sensor.findOneAndUpdate({ id: sensorId }, { currentValue: value });
};

exports.getAllSensorReadings = async (req, res, next) => {
  try {
    const sensorReadings = await SensorReading.find().sort({ time: -1 });

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

exports.getAllAlerts = async (req, res, next) => {
  try {
    const alerts = await Alert.find().sort({ time: -1 });

    return res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
