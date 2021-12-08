"use strict";

import express from "express";
import mongoose  from "mongoose";
import cors from "cors";

const morgan = require("morgan");
require("dotenv").config();


var usersRouter = require('./app/routes/users');
var notesRouter = require('./app/routes/notes')


// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR => ", err));



const app = express();
// Below are methods that are included in express(). We chain them for convenience.
// --------------------------------------------------------------------------------
// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("dev"));
app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:3000"],
    })
  );


app.use('/users', usersRouter);
app.use('/notes', notesRouter);

// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

// Node spins up our server and sets it to listen on port 8000.
app.listen(8000, () => console.log(`Listening on port 8000`));
