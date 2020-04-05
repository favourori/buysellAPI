let express = require("express");
let app = express();

require("dotenv").config();
const mongoose = require("mongoose");
//cors
let cors = require("cors");

//allowing cors

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "BuySell API",
  });
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
