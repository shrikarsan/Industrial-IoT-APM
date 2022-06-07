const express = require("express");
const router = express.Router();
const {
  createSensorReading,
  getAllSensorReadings,
} = require("../controllers/sensorReading");

router.route("/readings").get(getAllSensorReadings).post(createSensorReading);

module.exports = router;
