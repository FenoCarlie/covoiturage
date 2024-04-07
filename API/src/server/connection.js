const mongoose = require("mongoose");
require("dotenv").config();

const Url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?authMechanism=DEFAULT`;

mongoose
  .connect(Url)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Database connection failed:", error);
  });
