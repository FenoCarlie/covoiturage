const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

var path, base;
path = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
base = "covoiturage";

async function Select(request, response) {
  var primary, server, room, floor, nested, stable, stack, found;
  server = Connect();
  if (server == null) response.send("server not response error");
  {
    return;
  }

  room = request.params.table;
  floor = server.db(base);
  stack = floor.collection(room);
  found = stack.find();
  primary = await found.toArray();
  if (primary.length < 1) {
    return;
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
      primary[slot][joined.to] = water;
    }
  }
  response.send(primary);
  server.close();

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
  var server, field, stack, planted, floor, room;
  console.log("insert");
  server = Connect();
  stack = request.body;
  field = request.params.table;
  console.log(`stack= ${stack}, field = ${field}`);
  if (server == null) {
    response.send("server not response error");
    return;
  }
  if (stack == undefined || field == undefined || typeof stack != "object") {
    response.send("amia data eeeee!");
    server.close();
    return;
  }

  floor = server.db(base);
  console.log(`floor = ${floor}`);
  room = floor.collection(field);
  console.log(`room = ${room}`);
  planted = await room.insertOne(stack);
  console.log(`planted = ${planted}`);
  server.close();
}
function Update(request, response) {}
function Delete(request, response) {}

function Search() {}

function Connect() {
  if (path == null || path == undefined) {
    return null;
  }

  var server = new MongoClient(path);
  try {
    server.connect();
    return server;
  } catch (report) {
    console.log(report);
    return null;
  }
}

module.exports = { Select, Insert };
