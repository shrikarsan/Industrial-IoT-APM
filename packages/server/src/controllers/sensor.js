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

exports.getAllSensors = async (req, res, next) => {
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

exports.getSensor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sensor = await Sensor.findOne({ id: id });

    return res.status(200).json({
      success: true,
      data: sensor,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateSensor = async (req, res, next) => {
  const {
    id,
    name,
    type,
    unit,
    upperThresholdValue,
    lowerThresholdValue,
    machineId,
  } = req.body;

  try {
    const sensor = await Sensor.findOneAndUpdate(
      { id: id },
      {
        id: id,
        name: name,
        type: type,
        unit: unit,
        upperThresholdValue: upperThresholdValue,
        lowerThresholdValue: lowerThresholdValue,
        machineId: machineId,
      },
      { new: true }
    );
    return res.status(200).json({ success: true, data: sensor });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteSensor = async (req, res, next) => {
  try {
    const machineId = await Sensor.findOne({ id: req.body.id }).machineId;
    await Machine.findOneAndUpdate(
      { id: machineId },
      { $inc: { noOfSensors: -1 } }
    );

    await Sensor.deleteOne({ id: req.body.id });

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
