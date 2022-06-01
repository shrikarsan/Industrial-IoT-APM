const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
  check("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("ID is required!")
    .isString()
    .withMessage("Must be a valid string"),
  check("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First Name is required!")
    .isString()
    .withMessage("Must be a valid name!"),
  check("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last Name is required!")
    .isString()
    .withMessage("Must be a valid name!"),
  check("email").normalizeEmail().isEmail().withMessage("Invalid email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty!")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters at least!"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both password must be same!");
      }
      return true;
    }),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};

exports.validateUserLogin = [
  check("email").trim().isEmail().withMessage("email is required!"),
  check("password").trim().not().isEmpty().withMessage("password is required!"),
];
