const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const auth = require("./src/middlewares/auth");
const wineController = require("./src/controllers/wine");
const usersController = require("./src/controllers/users");

async function start() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/angularWine", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Ready");
  } catch (err) {
    console.log("Error connecting to database");
    return process.exit(1);
  }

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(auth());

  app.use("/data/catalog", wineController);
  app.use("/users", usersController);

  app.listen(3030, () => console.log("REST Service started on port 3030"));
}

start();
