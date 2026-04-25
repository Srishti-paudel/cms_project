require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const sendSms=require("./services/sendSms");

require("./model/index");


console.log("SID:", process.env.twilioauth);
console.log("AUTH:", process.env.twiliosec);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("uploads"));

app.use(cookieParser());

// ✅ MUST be BEFORE routes
app.use((req, res, next) => {
  res.locals.currentUser = req.cookies.token || null;
  next();
});

const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");

app.use("/", blogRoute);
app.use("/", userRoute);
sendSms("+9779846784743")
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Nodejs project has started at port ${PORT}`);
});