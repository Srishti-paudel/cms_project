const { users } = require("../model/index");
const bcrypt= require ("bcryptjs");
const { text } = require("express");
const jwt=require('jsonwebtoken')
// Register page
const sendEmail = require("../services/sendEmail");
exports.renderRegister = (req, res) => {
  res.render("register");
};

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.send("Please enter detail properly");
    }

    await users.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 10)
    });

    res.redirect("/login");

  } catch (error) {
    res.send("Something went wrong");
  }
};

// Show all users
exports.getAllUsers = async (req, res) => {
  const userdata = await users.findAll();
  res.render("users", { info: userdata });
};
exports.renderLoginForm=(req,res)=>{
  res.render('login')
}
exports.loginUser=async(req,res)=>{
  const {email,password}=req.body
  if(!email||!password){
    res.send("please send the data properly")
  }
  const user=await users.findAll({
    where:{
      email:email
    }
  })
  if(user.length==0){
     res.send("No user exists with that email")
  }
  else{//email xa bhanepaxi aba password milto ki nai vanera check garna paryo

 const isMatched= await bcrypt.compareSync(password,user[0].password)
 if(isMatched){
  const token =jwt.sign({id:user[0].id},'thisissecretkeydontshare',{expiresIn:'1d'})
   res.cookie('token',token)

  console.log(token)
 return res.redirect("/");
 }
else{
  res.send("credential failed")
}
  }
}
exports.logOutUser=(req,res)=>{
  res.clearCookie('token')
  res.redirect('/login')
}
exports.forgotpassword=(req,res)=>{
  res.render('forgotpassword')
}
exports.handleforgotPassword=async(req,res)=>{
const {email}=req.body;
if(!email){
  res.send("please provide a valid email address")
}
const data={
  email:email,
  subject:"Reset Password",
  text:"Your otp is:"+1234
}
await sendEmail(data)
res.send("otp send succesfully")
}