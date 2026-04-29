const { users } = require("../model/index");
const bcrypt= require ("bcryptjs");
const { text } = require("express");
const jwt=require('jsonwebtoken')
// Register page
const sendEmail = require("../services/sendEmail");
exports.renderRegister = (req, res) => {
  const error=req.flash('error')
  res.render("register",{error});
  

};

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
       const error=req.flash('error',"Please provide all the details")
      return res.redirect('register')
    }

    await users.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 10)
    });

    res.redirect("/login");

  } catch (error) {
console.log(error)
  }
}
// Show all users
exports.getAllUsers = async (req, res) => {
 try {const userdata = await users.findAll();
  res.render("users", { info: userdata });}
  catch(e){
    res.send(e.message)
  }
};
exports.renderLoginForm=(req,res)=>{
  const error=req.flash('error');
  console.log("error",error)
  res.render('login',{error})
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
req.flash('error',"Incorrect password or email")
res.redirect('/login')
}
  }
}
exports.logOutUser=(req,res)=>{
  res.clearCookie('token')
  res.redirect('/login')
}
exports.forgotpassword=(req,res)=>{
 const error= req.flash('error')
 console.log("error:", error)
  res.render('forgotpassword',{error})
}
exports.handleforgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(req.body)

  if (!email) {
    return res.send("Please provide a valid email ❌");
  }

  const user = await users.findOne({
    where: { email }
  });

  if (!user) {
req.flash('error',"No user found with that email")
    return res.redirect('/forgotpassword');
  }

  const generatedOTP = Math.floor(1000 + Math.random() * 9000);

  const data = {
    email: email,
    subject: "Reset Password",
    text: "Your OTP is: " + generatedOTP
  };

  await sendEmail(data);

  user.otp = generatedOTP;
  user.otpGeneratedTime =Date.now();
  await user.save();

  res.render("OTPform", { email }); // send email to next step
};

  // exports.verfyOTP = async(req,res)=>{
  //   const {otp}=req.body
  //   const data= await users.findAll({
  //     where:{
  //       otp:otp
  //     }
  //   })
  //   if(data.length<0){
  //     return res.send("invalid otp")
  //   }
  //   res.send("correct otp")
  // }
  exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
     console.log(req.body)
    // 1. validation
    if (!email || !otp) {
      req.flash('error',"email and otp are required ")
      res.redirect('/forgotpassword')
    }

    // 2. find user
    const user = await users.findOne({
      where: {
        email: email,
        otp: otp
      }
    });

    // 3. check user
    if (!user || user.length==0) {
      return res.send("Invalid OTP ");
    }
   const currentTime=Date.now()
   const otpGenerationTime= user.otpGeneratedTime
   const timeDiff=(currentTime-otpGenerationTime)/1000/60 // in minutes
   if(timeDiff>2){
    return res.send("OTP has expired ");

   }
    // 4. success
else{
  res.redirect(`/resetPassword?email=${email}&otp=${otp}`)
}

  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
};
exports.renderResetPassword=(req,res)=>{
  const { email, otp } = req.query;
  if(!email ||!otp){
    res.send("PLease send email and otp");
  }

  res.render('resetPassword',{email,otp});

}
exports.handleResetPasssword=async(req,res)=>{
   const { email, otp } = req.params;
   console.log("PARAMS:", req.params);
console.log("BODY:", req.body);
  const {newPassword,newPasswordConfirm}=req.body;
  if(!email || !otp || !newPassword || !newPasswordConfirm){
    res.send("please provide the details properly")

}
if(newPassword!==newPasswordConfirm){
  res.send("password and confirm password do not match")
}
const userData= await users.findAll({
  where:{
    email:email,
    otp:otp
  }
})

 const currentTime=Date.now()
   const otpGenerationTime= await userData[0].otpGeneratedTime
   const timeDiff=(currentTime-otpGenerationTime)/1000/60 // in minutes
   if(timeDiff<=2){
   userData[0].password=bcrypt.hashSync(newPassword,10)
   userData[0].save()

res.redirect("/login")

   }
else{

  return res.redirect('/forgotpassword')
}

}