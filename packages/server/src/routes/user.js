const express = require("express");

const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/user");

const {
  validateUserSignUp,
  userValidation,
} = require("../middlewares/validation/user");

router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.put("/users", updateUser);
router.post("/create-user", validateUserSignUp, userValidation, createUser);

module.exports = router;
