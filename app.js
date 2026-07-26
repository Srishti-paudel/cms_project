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
secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: false
}))
app.use(flash());

// console.log("SID:", process.env.twiloauth);
// console.log("AUTH:", process.env.twilosec);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(cookieParser());

// ✅ MUST be BEFORE routes
app.use(async (req, res, next) => {
    res.locals.currentUser = null;
    res.locals.currentUserId = null;

    if (req.cookies.token) {
        try {
            const data = await promisify(jwt.verify)(
                req.cookies.token,
               process.env.JWT_SECRET
            );

            console.log(data);

            res.locals.currentUser = req.cookies.token;
            res.locals.currentUserId = data.id;
        } catch (err) {
            console.log(err.message);
        }
    }

    next();
});

const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");
const commentRoute = require("./routes/commentRoute");
const contactRoute = require("./routes/contactRoute");
app.use("/", blogRoute);
app.use("/", userRoute);
app.use("/", commentRoute);
app.use("/", contactRoute);
app.get("/about", (req, res) => {
  res.render("about");
});

//sendSms("+9779846784743")

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Nodejs project has started at port ${PORT}`);
});