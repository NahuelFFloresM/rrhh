var express = require('express');

var router = express.Router();

const { User } = require("../models/user");

router.get('/', async function(req, res, next) {
  const allUsers = await User.find();
  // const newuser = new User({
  //   name: 'Nahuel Fabian Flores Medrano',
  //   age: 6011991,
  //   objective: "Fuerza",
  //   warmups: [],
  //   routines: [],
  //   exercises:[]
  //   });
  // newuser.save();
  res.send(allUsers);
});

module.exports = router;
