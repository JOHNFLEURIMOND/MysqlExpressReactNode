const router = require('express').Router();
let Exercise = require('../models/routes.model');

router.route('/add').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
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
    .then(() => res.json("Email added to DB!"))
    .catch(err => res.json("Error: " + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.firstName = req.body.firstName;
      exercise.middleName = req.body.middleName;
      exercise.lastName = req.body.lastName;
      exercise.phone = Number(req.body.phone);
      exercise.email = req.body.email;
      exercise.confirmEmail = req.body.confirmEmail;
      exercise.comments = req.body.comments;

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;