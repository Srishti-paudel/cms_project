const nodemailer=require("nodemailer");
async  function sendEmail(data){

  const transporter=  nodemailer.createTransport({
       service:"gmail" ,
       auth:{
        user:process.env.email,
        pass:process.env.password
       }
    })
  await  transporter.sendMail({
        from:"srishti paudel:<test@gmail.com>",
        to:data.email,
        subject:data.subject,
        text:data.text
    })
}
module.exports=sendEmail