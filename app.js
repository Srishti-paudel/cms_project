require("dotenv").config();
const express = require("express");
const jwt=require("jsonwebtoken")
const app = express();
const cookieParser = require("cookie-parser");
const {promisify}= require("util")

const sendSms=require("./services/sendSms");

const session=require("express-session");
const flash=require("connect-flash"); 


require("./model/index");
app.use(session({
  secret:"hellothisissecret",
  resave:false,
  saveUninitialized: false
}))
app.use(flash());

// console.log("SID:", process.env.twiloauth);
// console.log("AUTH:", process.env.twilosec);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("uploads"));

app.use(cookieParser());

// ✅ MUST be BEFORE routes
app.use(async(req, res, next) => {
  res.locals.currentUser = req.cookies.token || null;
  if(req.cookies.token){
    const data= await promisify(jwt.verify)(req.cookies.token,'thisissecretkeydontshare')
    console.log(data)
    res.locals.currentUserId=data.id
  }
  next();
});

const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");
const commentRoute = require("./routes/commentRoute");

app.use("/", blogRoute);
app.use("/", userRoute);
app.use("/", commentRoute);
//sendSms("+9779846784743")
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Nodejs project has started at port ${PORT}`);
});