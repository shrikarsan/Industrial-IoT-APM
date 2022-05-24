const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "This email is already in use, try login",
    });
  const user = await User({
    firstName,
    lastName,
    email,
    password,
    role,
  });
  await user.save();
  res.json({ success: true, user });
};
