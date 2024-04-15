const express = require("express");
const _ = require("lodash");
const cors = require("cors");
require("dotenv").config();

const {
  Select,
  Insert,
  Update,
  Delete,
  Search,
  Login,
} = require("./src/box.js");

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

app.get("/api/show/:table", Select);
app.post("/api/add/:table", Insert);
app.put("/api/update/:table", Update);
app.delete("/api/delete/:table", Delete);
app.post("/api/login/:table", Login);
app.post("/api/search/:table", Search);

const port = process.env.PORT || 7000; // Use environment variable for port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
