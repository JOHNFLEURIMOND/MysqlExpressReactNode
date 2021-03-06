//server.js

const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/db");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const Users = require("./routes/Users");
require("dotenv").config();
const User = require("./models/User");
var moment = require('moment');
const rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // get information from html forms
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness."
  })
);
db.authenticate()
  .then(() => console.log("Database is connected 💯 💯 💯 😀👍 📈... JF"))
  .catch(err =>
    console.log("Error connecting database 😒 😒 😒 😒👎 📉 ... JF  " + err)
  );

User.sync()
  .then(() =>
    console.log("User Table Create Successfully! 💯 💯 💯 😀👍 📈... JF " + rightNow )
  )
  .catch(err =>
    console.log("Not Getting User Table😒 😒 😒 😒👎 📉 ... JF  " + err)
  );


 
exports.createUser = async({name}) => {
  return await User.create({name});
};
exports.getAllUsers = async() => {
  return await User.findAll();
};
exports.getUser = async obj => {
  return await User.findOne({
    where: obj
  });
};

app.get("*", (req, res) => {
  db.getAllUsers()
    .then(user => res.json(user)
  )
});

app.post("/users", (req, res)    => {
  const userData = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    phone: Number(req.body.phone),
    StreetAddress: req.body.StreetAddress,
    email: req.body.email,
    confirmEmail: req.body.confirmEmail,
    // comments: req.body.comments,
    unit: req.body.unit,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    typeOfDegree: req.body.typeOfDegree,
    degreeAttained: req.body.degreeAttained,
    educationalInstitution: req.body.educationalInstitution,
    otherInformation: req.body.otherInformation,
    created: rightNow,
  };
  db.createUser({ userData })
  .then(user => res.json({user, message: "Email sent!"}))
});

app.use("/users", Users);

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("/app/index.html"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("/app/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
