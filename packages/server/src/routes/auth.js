const express = require("express");

const router = express.Router();
const {
  userLogin,
  userLogout,
  resetPasswordRequestController,
  resetPasswordController,
  changePasswordController,
  // profile,
} = require("../controllers/auth");

const { isAuth } = require("../middlewares/auth");
const {
  userValidation,
  validateUserLogin,
} = require("../middlewares/validation/user");

router.post("/login", validateUserLogin, userValidation, userLogin);
router.post("/logout", isAuth, userLogout);
router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);
router.post("/changePassword", changePasswordController);
// router.get("/profile", profile);

module.exports = router;
