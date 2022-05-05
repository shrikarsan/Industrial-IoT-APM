const express = require("express");
const router = express.Router();
const { getAlerts, addAlert } = require("../controllers/alert");

router.route("/alert").get(getAlerts).post(addAlert);

module.exports = router;
