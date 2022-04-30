const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    required: true,
  },
  date: {
    type: Date,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);
