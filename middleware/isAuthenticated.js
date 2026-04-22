const jwt=require("jsonwebtoken")
const {promisify}= require("util")
const {users}=require("../model")
exports.isAuthenticated=async(req,res,next)=>{
   const token = req.cookies.token
  if(!token|| token=="" ||token ==undefined){
    res.redirect("/login")
  }
  //yedi token xa bhane
const verifiedResult=await promisify(jwt.verify(token,thisisasecretkey))
const user =await users.findByPK(verifiedResult.id)
if(!user){
    return res.redirect("/login")
}
next()
}