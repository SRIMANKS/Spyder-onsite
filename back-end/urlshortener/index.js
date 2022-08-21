const express = require('express');
const app = express();
const mongoose = require('mongoose');
const linkModel = require('./models/link');

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/miniurl",
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
    console.log("server is running on port 3000");
});

async function cheakurl(){
    const res = await fetch('https://www.google.com/');
    console.log(res.status);
}


app.post("/short", async (req, res ,next) => {
    const longUrl = req.body.longUrl;
    var shortUrl = "";
    const exist = await linkModel.findOne({ longUrl });
    if (exist) {
        shortUrl = exist.shortUrl;
    }
        else{
            shortUrl = Math.random().toString(36).substring(2,7);
            var unique = false;
            while(!unique){
                var link = await linkModel.findOne({shortUrl: shortUrl});
                if(link){
                    shortUrl = Math.random().toString(36).substring(2,7);
                }else{
                    unique = true;
                }
            }
            const newlink = new linkModel({
                longUrl: longUrl,
                shortUrl: shortUrl,
            });
            await newlink.save();
        }

    res.redirect(`/response/${shortUrl}`);
});



app.get("/response/:shortUrl", async (req, res, next) => {
    res.render("response", { shortUrl: req.params.shortUrl });
});

app.get("/urllist", async (req, res, next) => {
    const lists = await linkModel.find();
    res.render("list", { urls: lists });
});



app.get("/mini/:url", async (req, res)=>{
    const shortUrl = req.params.url;
    const link = await linkModel.findOne({shortUrl: shortUrl});
    if(link){
        res.redirect(link.longUrl);
    }else{
        res.render("error",{error: "Link not found"});
    }

});
app.get("/",(req,res)=>{
    cheakurl();
    res.render("home");
});