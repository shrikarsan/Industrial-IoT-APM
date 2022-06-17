const express = require("express");
const router = express.Router();

const {
  createSensor,
  getAllSensors,
  getSensor,
  updateSensor,
} = require("../controllers/sensor");

router.get("/sensors", getAllSensors);
router.get("/sensor/:id", getSensor);
router.put("/sensors", updateSensor);
router.post("/create-sensor", createSensor);

module.exports = router;
