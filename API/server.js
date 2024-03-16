const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./src/config");
const _ = require("lodash");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 7000; // Use environment variable for port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
