const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./app/routers/tutorial.router");

const app = express();

var corsOption = {
  origin: "http: //localhost:8080",
};

app.use(cors(corsOption));

//parser requests of content-type - application/json
app.use(bodyParser.json());

//parser requests of content-type - application/x-www-form-urlencodes
app.use(bodyParser.urlencoded({ extended: true }));

//connect to mongodb
const server = `mongodb://localhost:27017`;
const database = `tutorials_db`;
mongoose
  .connect(`${server}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Cannot connect to database!", err);
    process.exit();
  });

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Wellcome to my tutorial" });
});

app.use("/", router);

//set Port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
