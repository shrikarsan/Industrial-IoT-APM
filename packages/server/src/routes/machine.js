const express = require("express");

const router = express.Router();
const {
  createMachine,
  getAllMachines,
  getMachine,
  updateMachine,
} = require("../controllers/machine");

router.get("/machines", getAllMachines);
router.get("/machine/:id", getMachine);
router.put("/machines", updateMachine);
router.post("/create-machine", createMachine);

module.exports = router;
