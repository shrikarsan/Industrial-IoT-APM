const express = require("express");
const router = express.Router();
const {
  getSensors,
  addSensor,
  deleteSensor,
} = require("../controllers/sensor");

router.route("/sensor").get(getSensors).post(addSensor);
router.route("/sensor/:id").delete(deleteSensor);

module.exports = router;
