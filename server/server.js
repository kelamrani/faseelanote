"use strict";

import express from "express";
import mongoose  from "mongoose";
import cors from "cors";
import Note from "./app/models/note";

const morgan = require("morgan");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);


const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-type"],
    },
});

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


// socketio
io.on("connect", (socket) => {
    console.log("SOCKET>IO", socket.id);
    // For given noteId:
    socket.on("get-document", async noteId => {
        console.log("noteId",noteId);
        const document = await findDocument(noteId) //DB (refer helper function)
        // console.log("document", document);
        console.log("room", noteId);
    socket.join(noteId); //isolating into "own" room
    socket.emit("load-document", document.body)

    socket.on("send-changes", delta => {
        console.log(delta);
        socket.broadcast.to(noteId).emit("receive-changes", delta) // "to(noteId)" emits to the specific "room"
    })

    socket.on("save-document", async data => {
        const result = await Note.findByIdAndUpdate(noteId, { body: data });
        console.log("save document", result);
    })
})
})

// =============================================
// DB - Persisting Documents:

async function findDocument(id) {
    if (id == null) return

    const document = await Note.findById(id) //finding a document by Id
    if (document) return document

}


// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

// Node spins up our server and sets it to listen on port 8000.
http.listen(8000, () => console.log(`Listening on port 8000`));
