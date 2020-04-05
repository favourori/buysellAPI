let express = require("express");
let app = express();



app.get("/", (req, res)=>{
    res.status(200).send({
        success: true,
        "message" : "BuySell API"
    })
})

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
