const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("./model/index");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("uploads"));

app.use(cookieParser()); 

const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");

app.use("/", blogRoute);
app.use("/", userRoute);
app.use((req,res,next)=>{
res.locals.currentUser = req.cookies.token
console.log(res.locals.currentUser)
  next()
})
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Nodejs project has started at port ${PORT}`);
});