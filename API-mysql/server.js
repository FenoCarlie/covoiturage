const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./src/config");
const _ = require("lodash");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API for IHM project");
});

/* *************** GET *************** */
// GET /user
app.get("/api/user", (req, res) => {
  const sql = `select * from user WHERE l_name = 'FENO'`;
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error retrieving data: " + err.message);
      return res.status(500).json({ error: "Error retrieving data" }); // Return an error response
    }
    return res.json(data);
  });
});

app.get("/api/user/with_token", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = payload.id;

  const findUserQuery = "SELECT * FROM user WHERE id = ?";
  connection.query(findUserQuery, [userId], (error, results) => {
    if (error) {
      console.error("Error while fetching user data:", error);
      res.status(500).send("Error while fetching user data.");
    } else {
      res.status(200).send(results[0]);
    }
  });
});

// GET /course
app.get("/api/course", (req, res) => {
  const sql = "select * from course";
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error retrieving data: " + err.message);
      return res.status(500).json({ error: "Error retrieving data" }); // Return an error response
    }
    return res.json(data);
  });
});

// GET /booking
app.get("/api/booking", (req, res) => {
  const sql = "select * from booking";
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error retrieving data: " + err.message);
      return res.status(500).json({ error: "Error retrieving data" }); // Return an error response
    }
    return res.json(data);
  });
});
//

/* *************** POST *************** */
// create new user & signup

// Check if the existing email is already registered
app.post("/api/register", async (req, res) => {
  try {
    let { f_name, l_name, email, contact, profile_img, password } = req.body;

    if (!email) {
      return res.status(400).send("Email is required.");
    }

    const findEmailQuery = "SELECT * FROM user WHERE email = ?";
    const existingUserWithEmail = await new Promise((resolve, reject) => {
      connection.query(findEmailQuery, [email], (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    if (existingUserWithEmail.length > 0) {
      return res.status(400).send("The existing email is already registered.");
    }

    if (!contact) {
      return res.status(400).send("Contact is required.");
    }

    const findContactQuery = "SELECT * FROM user WHERE contact = ?";
    const existingUserWithContact = await new Promise((resolve, reject) => {
      connection.query(findContactQuery, [contact], (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    if (existingUserWithContact.length > 0) {
      return res
        .status(400)
        .send("The existing contact is already registered.");
    }

    if (!password) {
      return res.status(400).send("Password is required.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      f_name,
      l_name,
      email,
      contact,
      profile_img,
      password: hashedPassword,
    };

    const insertQuery = "INSERT INTO user SET ?";
    await new Promise((resolve, reject) => {
      connection.query(insertQuery, newUser, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    res.status(201).send("User registered successfully.");
  } catch (error) {
    console.error("Error while registering the user:", error);
    res.status(500).send("Error while registering the user.");
  }
});

app.post("/api/course", async (req, res) => {
  try {
    let {
      id_driver,
      loc_start,
      loc_end,
      cost_one,
      time_start,
      car_place,
      car_num,
    } = req.body;

    if (
      !id_driver ||
      !loc_start ||
      !loc_end ||
      !cost_one ||
      !time_start ||
      !car_place ||
      !car_num
    ) {
      return res.status(400).send("All fields are required.");
    }

    const insertQuery = "INSERT INTO course SET ?";
    await new Promise((resolve, reject) => {
      connection.query(
        insertQuery,
        {
          id_driver,
          loc_start,
          loc_end,
          cost_one,
          time_start,
          car_place,
          car_num,
        },
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
    res.status(201).send("Course registered successfully.");
  } catch (error) {
    console.error("Error while registering the course:", error);
    res.status(500).send("Error while registering the course.");
  }
});

// login
app.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const findUserQuery = "SELECT * FROM user WHERE email = ?";
    const user = await new Promise((resolve, reject) => {
      connection.query(findUserQuery, [email], (error, results) => {
        if (error) reject(error);
        resolve(results[0]);
      });
    });

    if (!user) {
      return res.status(400).send("User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid password.");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        lastName: user.l_name,
        firstName: user.f_name,
        avatar: user.profile_img,
      },
      process.env.JWT_SECRET || "your_default_secret",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error while logging in the user:", error);
    res.status(500).send("Error while logging in the user.");
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error while logging out the user:", error);
      res.status(500).send("Error while logging out the user.");
    } else {
      res.status(200).send("User logged out successfully.");
    }
  });
});

//

app.post("api/route");

// Utilisation du middleware pour protéger une route
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).send({ user: req.user });
});

/* *************** PUT *************** */

/* *************** DELETE *************** */

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_default_secret"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

const port = process.env.PORT || 7000; // Use environment variable for port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
