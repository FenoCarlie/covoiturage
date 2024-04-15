const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const opencage = require("opencage-api-client");

var path, base;
path = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?authMechanism=DEFAULT`;
base = process.env.DB_NAME;
server = Connect();

async function Select(request, response) {
  var primary, member, room, floor, nested, stable, stack, found;
  if (server == null) {
    response.send("server not response error");
    return;
  }

  if (typeof request.body != "object") {
    request.body = undefined;
  }

  room = request.params.table;
  floor = server.db(base);
  stack = floor.collection(room);
  found = stack.find(request.body);
  primary = await found.toArray();
  if (primary.length < 1) {
    response.send("Not found");
    return;
  }
  for (member in primary) {
    if (isNaN(member)) {
      continue;
    }
    delete primary[member].password;
  }

  nested = await GetNestedCollections(primary[0]);
  for (stable in nested) {
    var joined, slot;
    joined = nested[stable];
    for (slot in primary) {
      var land, water, filter;
      filter = { _id: new ObjectId(primary[slot][joined.from]) };
      land = floor.collection(joined.to);
      water = await land.findOne(filter);
      if (water == null) {
        continue;
      }
      delete water.password;
      primary[slot][joined.to] = water;
    }
  }
  response.send(primary);

  async function GetNestedCollections(sample) {
    var nested, hay, field, chamber, stack;
    chamber = floor.listCollections();
    hay = await chamber.toArray();

    nested = new Array();
    for (field in sample) {
      var lower = field.toLowerCase();
      for (stack in hay) {
        var stacked = hay[stack].name;
        stacked = stacked.toLowerCase();

        if (lower.includes(stacked)) {
          nested.push({ from: field, to: hay[stack].name });
        }
      }
    }
    return nested;
  }
}
async function Insert(request, response) {
  var tokenize, field, stack, nested, planted, floor, room, sweep;
  stack = request.body;
  field = request.params.table;

  if (server == null) {
    response.send("Unreachable server");
    return;
  }
  if (stack == undefined || field == undefined || typeof stack != "object") {
    response.send("Bad input");
    return;
  }

  if (field == "reservations") {
    sweep = { params: {}, body: {} };
    sweep.params.table = "courses";
    nested = await Find(sweep.params.table, { id: stack.idCourses });
    if (nested.carPlace != undefined && nested.seats == undefined) {
      nested.seats = nested.carPlace;
      delete nested.carPlace;
      sweep.body.remove = { carPlace: "" };
    }
    if (nested.seats < stack.seats) {
      response.send("{ left: " + nested.seats + " }");
      return;
    }
    nested.seats -= stack.seats;
    sweep.body.id = nested._id.toString();
    sweep.body.data = nested;
    delete sweep.body.data._id;
    Update(sweep);
  } else if (field == "courses") {
    request.body.locStart = await FixLocation(request.body.locStart);
    request.body.locEnd = await FixLocation(request.body.locEnd);
  }
  if (stack.password != undefined) {
    let duplicate, sign;
    sign = { email: stack.email };
    duplicate = await Find(field, sign);
    if (duplicate != null) {
      response.send("Duplicate");
      return;
    }
    stack.password = await bcrypt.hash(stack.password, 10);
    tokenize = true;
  }

  floor = server.db(base);
  room = floor.collection(field);
  planted = await room.insertOne(stack);

  request.body = undefined;
  if (tokenize) {
    let token;
    token = jwt.sign({ id: planted.insertedId }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    response.send(token);
  } else {
    field === "reservations"
      ? response.send("Reservation successfully")
      : Select(request, response);
  }

  async function FixLocation(location = null) {
    if (location == null) {
      return;
    }

    location = { name: location };
    location.result = opencage.geocode({
      q: location.name,
      key: process.env.OPENCAGE_API_KEY,
    });
    location.result = await Promise.resolve(location.result);
    location.result = location.result.results;
    location.coord = location.result[0].geometry;
    delete location.result;
    return location;
  }
}

async function Logout(request, response) {
  try {
    // Clear the token from the client's storage
    response.clearCookie("token");

    // Send a success message
    response.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout Error: ", error);
    response.status(500).send("Server error");
  }
}

async function Update(request, response = null) {
  var field, stack, floor, update, filter, plant, room;
  stack = request.body;
  field = request.params.table;
  filter = { _id: new ObjectId(stack.id) };
  update = { $set: stack.data };

  if (server == null) {
    if (response != null) {
      response.send("Unreachable server");
    }
    return;
  }
  if (
    stack == undefined ||
    field == undefined ||
    stack.id == undefined ||
    stack.data == undefined
  ) {
    if (response != null) {
      response.send("Invalid input");
    }
    return;
  }

  floor = server.db(base);
  room = floor.collection(field);
  plant = await room.updateOne(filter, update);

  if (response == null) {
    return;
  }

  if (plant.acknowledged) {
    Select(request, response);
  } else {
    response.send("Failed");
  }
}
async function Delete(request, response) {
  var field, stack, remove, filter, floor, room;
  stack = request.body;
  field = request.params.table;

  if (plant.acknowledged) {
    request.body = undefined;
    Select(request, response);
  } else {
    response.send("Failed");
  }
}
async function Delete(request, response) {
  var field, stack, remove, filter, floor, room;
  stack = request.body;
  field = request.params.table;

  if (server == null) {
    response.send("Unreachable server");
    return;
  }
  if (stack == undefined || field == undefined || stack.id == undefined) {
    response.send("Invalid input");
    return;
  }
  filter = { _id: new ObjectId(stack.id) };

  floor = server.db(base);
  room = floor.collection(field);
  remove = await room.deleteOne(filter);

  if (remove.acknowledged) {
    request.body = undefined;
    Select(request, response);
  } else {
    response.send("Failed");
  }
}
async function Login(request, response) {
  var matched, sample, credential, table, filter, status;
  credential = request.body;
  table = request.params.table;
  if (table == undefined || credential == undefined) {
    response.send("Invalid input");
    return;
  }

  filter = { email: credential.email };
  sample = await Find(table, filter);
  if (sample == null) {
    response.send("Mail");
    return;
  }
  matched = await bcrypt.compare(credential.password, sample.password);
  if (matched) {
    status = {};
    status.token = jwt.sign({ id: sample._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    delete sample.password;
    status.user = sample;
  } else {
    status = "password";
  }
  response.send(status);
}

async function Find(table, filter) {
  if (
    table == undefined ||
    (filter != undefined && typeof filter != "object")
  ) {
    return;
  }

  var collected, hay, stack;
  stack = server.db(base);
  hay = stack.collection(table);
  if (filter.id != undefined) {
    filter["_id"] = new ObjectId(filter.id);
    delete filter.id;
  }
  collected = await hay.findOne(filter);
  return collected;
}

function Search(request, response) {
  var filter;
  filter = request.body;

  if (filter == undefined || filter == null) {
    Select(request, response);
    return;
  }
  if (filter.id != undefined) {
    filter["_id"] = new ObjectId(filter.id);
    delete filter.id;
  }
  request.body = filter;
  Select(request, response);
}

function Connect() {
  if (path == null || path == undefined) {
    return null;
  }

  var link = new MongoClient(path);
  try {
    link.connect();
    console.log("Connected to database successfully");
    return link;
  } catch (report) {
    console.log(report);
    return null;
  }
}

module.exports = { Select, Insert, Update, Delete, Search, Login, Logout };
