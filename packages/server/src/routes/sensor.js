const express = require("express");
const router = express.Router();

const { createSensor, getSensors } = require("../controllers/sensor");

router.get("/sensors", getSensors);
router.post("/create-sensor", createSensor);

module.exports = router;
