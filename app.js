const express = require("express");
const path = require("path");
const port = 3000;

const app = express();

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// serving static files
app.use(express.static(path.join(__dirname, "public")));

// connect mongodb database
require('./server/database/database')();

//setup view engine
app.set("view engine", "ejs");

// calling the routes
app.use("/", require("./server/router/router"));

app.listen(port, () => {
  console.log("Example app listening at http://localhost:" + port);
});
