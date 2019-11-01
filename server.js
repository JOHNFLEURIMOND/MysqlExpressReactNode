//server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Exercise = require("./models/routes.model");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(require('./routes/routes'));
app.post("/", async (req, res) => {
  const firstName =  await req.body.firstName;
  const middleName = await req.body.middleName;
  const lastName = await req.body.lastName;
  const phone = await Number(req.body.phone);
  const email = await req.body.email;
  const confirmEmail = await req.body.confirmEmail;
  const comments = await req.body.comments;
  const StreetAddress = await req.body.StreetAddress;
  const unit = await req.body.unit;
  const state = await req.body.state;
  const city = await req.body.city;
  const zip =  awaitreq.body.zip;
  const typeOfDegree = await req.body.typeOfDegree;
  const degreeAttained = await req.body.degreeAttained;
  const educationalInstitution = await req.body.educationalInstitution;
  const otherInformation = await req.body.otherInformation;

  const newExercise =  new Exercise({
    firstName,
    middleName,
    lastName,
    phone,
    email,
    confirmEmail,
    comments,
    StreetAddress,
    unit,
    state,
    city,
    zip,
    typeOfDegree,
    degreeAttained,
    educationalInstitution,
    otherInformation
  });
  newExercise
    .save()
    .then((exercise) => res.json(exercise))
    .catch(err => res.json("Error: " + err));
});

app.use(bodyParser.json()); // get information from html forms
if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("/app/index.html"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("/app/index.html"));
  });
}

// Listen to whatever port above.
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
