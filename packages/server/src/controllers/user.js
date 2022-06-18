const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { id, firstName, lastName, email, password, role, managedBy } =
    req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "This email is already in use, try login",
    });
  const user = await User({
    id,
    firstName,
    lastName,
    email,
    password,
    role,
    managedBy,
  });
  await user.save();
  res.json({ success: true, user });
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: "user not found, with the given email!",
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "email / password does not match!",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((t) => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  const userInfo = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };

  res.json({ success: true, user: userInfo, token });
};

exports.logout = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization fail!" });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: "Sign out successfully!" });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id: id });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const {
    id,
    firstName,
    lastName,
    email,
    setNewPassword,
    password,
    role,
    managedBy,
  } = req.body;

  try {
    if (setNewPassword) {
      const hash = await bcrypt.hash(password, 8);
      const user = await User.findOneAndUpdate(
        { id: id },
        {
          id,
          firstName,
          lastName,
          email,
          password: hash,
          role,
          managedBy,
        },
        { new: true }
      );
      return res.status(200).json({ success: true, data: user });
    } else {
      const user = await User.findOneAndUpdate(
        { id: id },
        {
          id,
          firstName,
          lastName,
          email,
          role,
          managedBy,
        },
        { new: true }
      );
      return res.status(200).json({ success: true, data: user });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
