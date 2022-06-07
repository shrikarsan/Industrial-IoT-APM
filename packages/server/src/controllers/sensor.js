const Sensor = require("../models/sensor");
const Machine = require("../models/machine");

exports.createSensor = async (req, res) => {
  const {
    id,
    name,
    type,
    unit,
    upperThresholdValue,
    lowerThresholdValue,
    machineId,
  } = req.body;

  const sensor = await Sensor({
    id,
    name,
    type,
    unit,
    upperThresholdValue,
    lowerThresholdValue,
    machineId,
  });
  await sensor.save();
  res.json({ success: true, sensor });

  await Machine.findOneAndUpdate(
    { id: machineId },
    { $inc: { noOfSensors: 1 } }
  );
};

exports.getSensors = async (req, res, next) => {
  try {
    const sensors = await Sensor.find();

    return res.status(200).json({
      success: true,
      count: sensors.length,
      data: sensors,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};