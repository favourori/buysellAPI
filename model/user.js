const mongoose = require("mongoose");

//crreate investor schema
let userSchema = mongoose.Schema({
  fullName: { type: String, required: [true, "please enter your firstname"] },
  email: { type: String, required: [true, "please enter your email"] },
  password: { type: String, required: [true, "please enter your  password"] },
  dateJoined: { type: Date },
});

let User = mongoose.model("user", userSchema);

module.exports = User;
