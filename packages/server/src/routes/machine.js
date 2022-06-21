const express = require("express");

const router = express.Router();
const {
  createMachine,
  getAllMachines,
  getMachine,
  updateMachine,
  deleteMachine,
} = require("../controllers/machine");

router.get("/machines", getAllMachines);
router.get("/machine/:id", getMachine);
router.put("/machines", updateMachine);
router.post("/create-machine", createMachine);
router.post("/delete-machine", deleteMachine);

module.exports = router;
