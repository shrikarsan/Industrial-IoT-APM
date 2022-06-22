const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "supervisor"],
    required: true,
  },
  managedBy: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
      signedAt: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing, can not compare!");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error("Invalid Email");
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log("error inside isThisEmailInUse method", error.message);
    return false;
  }
};

userSchema.statics.isThisIdInUse = async function (id) {
  if (!id) throw new Error("Invalid Id");
  try {
    const user = await this.findOne({ id });
    if (user) return false;

    return true;
  } catch (error) {
    console.log("error inside isThisIdInUse method", error.message);
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
