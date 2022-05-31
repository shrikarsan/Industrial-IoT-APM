const express = require("express");

const router = express.Router();
const { createMachine, getMachines } = require("../controllers/machine");

router.get("/machines", getMachines);
router.post("/create-machine", createMachine);

module.exports = router;
