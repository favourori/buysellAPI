const mongoose = require("mongoose");

//crreate investor schema
let userSchema = mongoose.Schema({
  fullName: { type: String, required: [true, "please enter your full name"] },
  email: { type: String, required: [true, "please enter your email"] },
  password: { type: String, required: [true, "please enter your  password"] },
  dateJoined: { type: Date, default: Date.now }
});

let User = mongoose.model("user", userSchema);

module.exports = User;
