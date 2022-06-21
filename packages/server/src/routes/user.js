const express = require("express");

const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const {
  validateUserSignUp,
  userValidation,
} = require("../middlewares/validation/user");

router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.put("/users", updateUser);
router.post("/create-user", validateUserSignUp, userValidation, createUser);
router.post("/delete-user", deleteUser);

module.exports = router;
