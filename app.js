let express = require("express");
let app = express();

require("dotenv").config();
const mongoose = require("mongoose");
//cors
let cors = require("cors");

app.use(express.static(__dirname + "/public"));

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

//Body Middlewares here
let bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to db here
mongoose
    .connect(process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to DB");
    })
    .catch((e) => {
        console.log(e.message);
    });

app.get("/", (req, res) => {
    res.status(200).send({
        success: true,
        message: "BuySell API",
    });
});

//import routes

let userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");

app.use("/buysellapi/v1/user", userRoute);
app.use("/buysellapi/v1/category", categoryRoute);
app.use("/buysellapi/v1/product", productRoute);

let PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
