const Machine = require("../models/machine");

exports.createMachine = async (req, res) => {
  const {
    id,
    name,
    status,
    purchasedDate,
    lastMaintenance,
    isActuatorPresent,
    actuatorId,
    actuatorName,
  } = req.body;

  if (isActuatorPresent) {
    const machine = await Machine({
      id,
      name,
      status,
      purchasedDate,
      lastMaintenance,
      actuatorId,
      actuatorName,
    });
    await machine.save();
    res.json({ success: true, machine });
  } else {
    const machine = await Machine({
      id,
      name,
      status,
      purchasedDate,
      lastMaintenance,
    });
    await machine.save();
    res.json({ success: true, machine });
  }
};

exports.getAllMachines = async (req, res, next) => {
  try {
    const machines = await Machine.find();

    return res.status(200).json({
      success: true,
      count: machines.length,
      data: machines,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getMachine = async (req, res, next) => {
  const { id } = req.params;
  try {
    const machine = await Machine.findOne({ id: id });

    return res.status(200).json({
      success: true,
      data: machine,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateMachine = async (req, res, next) => {
  const {
    id,
    name,
    status,
    purchasedDate,
    lastMaintenance,
    isActuatorPresent,
    actuatorId,
    actuatorName,
  } = req.body;

  try {
    if (isActuatorPresent) {
      const machine = await Machine.findOneAndUpdate(
        { id: id },
        {
          id: id,
          name: name,
          status: status,
          purchasedDate: purchasedDate,
          lastMaintenance: lastMaintenance,
          actuatorId: actuatorId,
          actuatorName: actuatorName,
        },
        { new: true }
      );
      return res.status(200).json({ success: true, data: machine });
    } else {
      const machine = await Machine.findOneAndUpdate(
        { id: id },
        {
          id: id,
          name: name,
          status: status,
          purchasedDate: purchasedDate,
          lastMaintenance: lastMaintenance,
        },
        { new: true }
      );
      return res.status(200).json({ success: true, data: machine });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
