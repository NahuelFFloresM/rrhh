
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchhema = new Schema({
  name: String, // String is shorthand for {type: String}
  age: Number,
  objective: String,
  warmups: [{ 
    dia: String,
    warmup: [String] 
  }],
  routines: [{ 
    dia : String,
    routine: [String]
  }],
  exercises:[{
    type: String,
    excercise: [String]
  }]
});

const User = mongoose.model("User", UserSchhema);

module.exports = { User };