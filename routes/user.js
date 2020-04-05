let express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let User = require("../model/user");

//handling user login
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials" });

    //Else if the email is valid, let's check for the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //console.log(validPassword)
    if (!validPassword)
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials" });

    //Username & password are valid..
    //Create & Assign Token

    const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
    res
      .header("auth-token", token)
      .status(200)
      .send({ success: true, token: token, data: user });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//register
//handling user registration
router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .send({ success: false, message: "A user with this email exists" });
    } else {
      //Hash password
      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(req.body.password, salt);
      //console.log("not found");
      let newUser = await new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
      });

      newUser
        .save()
        .then((data) => {
          const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET);

          res.header("auth-token", token).status(200).send({
            success: true,
            data: data,
            token: token,
          });
        })
        .catch((err) => {
          res.status(400).send(err.message);
        });
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
