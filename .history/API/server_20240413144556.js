const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { User, Course, Reservation } = require("./src/config");
const _ = require("lodash");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const opencage = require("opencage-api-client");

const { Select, Insert, Update, Delete, Search } = require("./src/box.js");

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

app.get("/api/show/:table", Select);
app.post("/api/add/:table", Insert);
app.put("/api/update/:table", Update);
app.delete("/api/delete/:table", Delete);

app.post("/api/search/:table", Search);

const registerUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password, phone, avatar } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).send("firstName or lastName is required.");
    }

    if (!avatar) {
      avatar = "";
    }

    if (!password) {
      return res.status(400).send("Password is required.");
    }

    if (!email) {
      return res.status(400).send("Email is required.");
    }

    const existingEmail = req.query.existingEmail;
    if (existingEmail) {
      const existingUserWithExistingEmail = await User.findOne({
        email: existingEmail,
      });
      if (existingUserWithExistingEmail) {
        return res
          .status(400)
          .send("The existing email is already registered.");
      }
    }

    if (!phone) {
      return res.status(400).send("Phone number is required.");
    }

    const existingPhone = req.query.existingPhone;
    if (existingPhone) {
      const existingUserWithExistingPhone = await User.findOne({
        phone: existingPhone,
      });
      if (existingUserWithExistingPhone) {
        return res
          .status(400)
          .send("The existing phone number is already registered.");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      phone,
      avatar,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // Send token in response body
    res
      .status(201)
      .json({ token, user: _.omit(newUser.toObject(), ["password"]) });
  } catch (error) {
    console.error("Error while registering the user:", error);
    res.status(500).send("Error while registering the user.");
  }
};

app.get("/api/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).send("Error while fetching users.");
  }
});

opencage
  .geocode({ q: "lyon" })
  .then((data) => {
    console.log(data.results[0].geometry);
  })
  .catch((error) => {
    console.log("error", error.message);
  });

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Missing credentials.");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).send("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid email or password.");
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // Send token in response body
    res
      .status(200)
      .json({ token, user: _.omit(user.toObject(), ["password"]) });
  } catch (error) {
    console.log("Login Error: ", error);
    res.status(500).send("Server error");
  }
};

const logoutUser = (req, res) => {
  try {
    // Clear the token from the client's storage
    res.clearCookie("token");

    // Send a success message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout Error: ", error);
    res.status(500).send("Server error");
  }
};

app.post("/api/login", loginUser);

app.post("/api/register", registerUser);

app.post("/api/logout", logoutUser);
app.get("/api/itinerary", async (req, res) => {
  try {
    const itinerary = await Course.find({});
    res.status(200).send(itinerary);
  } catch (error) {
    console.error("Error while fetching itinerary", error);
    res.status(500).send("Error while fetching itinerary.");
  }
});

// Protected routes
app.use(async (req, res, next) => {
  const token = req.headers["x-auth"];

  if (!token) {
    return res.status(401).send({ msg: "No token provided." });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(verifiedToken.id);
    next();
  } catch (e) {
    res.status(401).send({ msg: "Invalid Token!" });
  }
});

const port = process.env.PORT || 7000; // Use environment variable for port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
