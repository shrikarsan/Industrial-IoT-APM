const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const chalk = require("chalk");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const userRouter = require("./routes/user");
const machineRouter = require("./routes/machine");

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(machineRouter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(
  PORT,
  console.log(
    chalk.yellow.bold(
      `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
    )
  )
);
