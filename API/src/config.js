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

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    avatar: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const CourseSchema = new mongoose.Schema(
  {
    idDriver: {
      type: String,
      required: true,
    },
    locStart: {
      type: String,
      required: true,
    },
    locEnd: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    dateDep: {
      type: Date,
      required: true,
    },
    carPlace: {
      type: Number,
      required: true,
    },
    carNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReservationSchema = new mongoose.Schema(
  {
    idCourse: {
      type: String,
      required: true,
    },
    idClient: {
      type: String,
      required: true,
    },
    placeNum: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", CourseSchema);
const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = { User, Course, Reservation };
