const express = require("express");
const bodyParser = require("body-parser");
const { User, Course, Reservation } = require("./src/config");
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
  Logout,
  SearchIti,
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
app.post("/api/logout", Logout);
app.post("/api/searchiti/:table", SearchIti);

const port = process.env.PORT || 7000; // Use environment variable for port
const host = `192.168.3.112`;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
