const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./config/database");
dotenv.config({ path: "./config/config.env" });

// Routes
const auth = require("./routes/auth");

db.authenticate()
  .then(() => console.log("MySQL Connected"))
  .catch((err) => console.log("Error: " + err));

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/auth", auth);

const PORT = process.env.PORT || 6000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
