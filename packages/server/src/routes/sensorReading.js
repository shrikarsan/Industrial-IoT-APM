const express = require("express");
const router = express.Router();
const {
  createSensorReading,
  getAllSensorReadings,
  getAllAlerts,
} = require("../controllers/sensorReading");

router.route("/readings").get(getAllSensorReadings).post(createSensorReading);
router.route("/alerts").get(getAllAlerts);

module.exports = router;
