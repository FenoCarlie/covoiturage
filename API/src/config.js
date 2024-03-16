const mysql = require("mysql2");
require("dotenv").config();

const host = process.env.DB_HOST;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database!");
  }
});

module.exports = connection;
