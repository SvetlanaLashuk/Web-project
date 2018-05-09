"use strict";

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const Parser = require("rss-parser");
const db = require("./config/db");

let app = express();
let parser = new Parser();

// Set up the template engine
app.set("views", "./views");
app.set("view engine", "pug");

// Set up middleware
app.use(express.static("public"));
app.use(bodyParser.json());

MongoClient.connect(db.url, (err, database) => {
    if (err) {
        return console.log(err);
    }

    // Require routes
    require("./routes")(app, database, parser);

    // Start up the server
    app.listen(3000, () => {
        console.log("Listening on http://localhost:3000");
    });
});
