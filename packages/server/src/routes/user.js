const express = require("express");

const router = express.Router();
const { createUser, userLogin, logout } = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");
const {
  validateUserSignUp,
  userValidation,
  validateUserLogin,
} = require("../middlewares/validation/user");

router.post("/create-user", validateUserSignUp, userValidation, createUser);
router.post("/login", validateUserLogin, userValidation, userLogin);
router.post("/logout", isAuth, logout);

module.exports = router;