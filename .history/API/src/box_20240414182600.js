const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const opencage = require("opencage-api-client");

var path, base;
path = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?authMechanism=DEFAULT`;
//path = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
base = "test";
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
      console.log(filter, water);
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
  var field, stack, planted, floor, room;
  stack = request.body;
  field = request.params.table;
  if (server == null) {
    response.send("server not response error");
    return;
  }
  if (stack == undefined || field == undefined || typeof stack != "object") {
    response.send("amia data eeeee!");
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

  floor = server.db(base);
  room = floor.collection(field);
  planted = await room.insertOne(stack);

  request.body = undefined;
  response.send(planted.insertedId);
  //Select(request, response);

  async function FixLocation(location = null) {
    if (location == null) {
      return;
    }

    location = { name: location };
    location.result = opencage.geocode({
      q: location.name,
      key: "44528d1f7adc48259362a60e9f4f0054",
    });
    location.result = await Promise.resolve(location.result);
    location.result = location.result.results;
    location.coord = location.result[0].geometry;
    delete location.result;
    return location;
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
    Select(request, response);
  } else {
    response.send("Failed");
  }
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
    return link;
  } catch (report) {
    console.log(report);
    return null;
  }
}

module.exports = { Select, Insert, Update, Delete, Search };
