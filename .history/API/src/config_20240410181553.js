const mongoose = require("mongoose");
require("dotenv").config();

const Url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
//const Url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster69.wi2ofwr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
//mongodb+srv://bozer:<password>@cluster69.wi2ofwr.mongodb.net/

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
      required: false,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const CourseSchema = new mongoose.Schema(
  {
    idUsers: {
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
    idCourses: {
      type: String,
      required: true,
    },
    idUsers: {
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
const Course = mongoose.model("course", CourseSchema);
const Reservation = mongoose.model("reservation", ReservationSchema);

module.exports = { User, Course, Reservation };
