import express from "express";
import { Select, Insert } from "./box.js";

const engine = express ();
const port = 2897;

engine.use (express.json ());
engine.use (express.urlencoded ({ extended: true }));

engine.get ("/show/:table", Select);
engine.post ("/add/:table", Insert);

engine.listen (port);