const router = require('express').Router();
let Exercise = require('../models/routes.model');

router.route('/add').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const phone = Number(req.body.username);
  const email = req.body.email;
  const confirmEmail = req.body.confirmEmail;
  const comments = req.body.comment;

  const newExercise = new Exercise({
    firstName,
    middleName,
    lastName,
    phone,
    email,
    confirmEmail,
    comments,
  });

  newExercise.save()
  .then(() => res.json('Email added!'))
   .catch(err => res.status(400).json('Error: ' + err));
  console.log(res.json('Email added!'));
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