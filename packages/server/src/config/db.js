const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      chalk.cyan.underline.bold(`MongoDB Connected: ${conn.connection.host}`)
    );
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
};

module.exports = connectDB;
