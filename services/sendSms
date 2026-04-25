require("dotenv").config();
const twilio=require('twilio')(process.env.twiloauth,process.env.twilosec);
console.log(process.env.twiloauth)
async function sendSms(number){
  await  twilio.messages.create({
        body:"Testing Sms in nodejs"+123,
        to:number,
        from:process.env.twilioNumber
    })
    console.log("message sent")
}
module.exports=sendSms