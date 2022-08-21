const mongoose = require('mongoose');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");


dotenv.config();



const emailModel = require('./models/email');


mongoose
  .connect(
    "mongodb://127.0.0.1:27017/webmoniter",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(3000, () => {
    console.log("server started at port 3000");
});



function sendmail(useremail,status){
  console.log(useremail,status);
}

setInterval(() =>{
  console.log("cheaking status");
  const list = emailModel.find({});

  for(let i = 0; i < list.length; i++){
    message = fetch(list[i].monitorurl);
    if(res.status!==list[i].currentstatus){
      sendmail(list[i].useremail,message.status);
    }
  }
},20000);



app.post("/", async (req, res,next) => {
  const response = await fetch(req.body.url);
    const email  = new emailModel({
        useremail: req.body.email,
        monitorurl: req.body.url,
        currentstatus: response.status,
    });
    await email.save();
    res.redirect("/response");
});
app.get("/", (req, res) => {
    res.render("home");
});