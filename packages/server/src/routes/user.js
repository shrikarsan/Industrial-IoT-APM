const express = require("express");

const router = express.Router();
const {
  createUser,
  userLogin,
  logout,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");
const {
  validateUserSignUp,
  userValidation,
  validateUserLogin,
} = require("../middlewares/validation/user");

router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.put("/users", updateUser);
router.post("/create-user", validateUserSignUp, userValidation, createUser);

router.post("/login", validateUserLogin, userValidation, userLogin);
router.post("/logout", isAuth, logout);

module.exports = router;
