const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const dotenv=require("dotenv");
const router = require("express").Router();
dotenv.config();

router.post('/confirm',(req,res)=>{
  console.log("Email "+req.body);
  const {name,email}=req.body;
  const sgMail = require('@sendgrid/mail');
  const date=new Date().toISOString();
  const time=new Date().toLocaleTimeString('en',{timeZone: 'IST' });
  sgMail.setApiKey(process.env.KEY)
  const msg = {
    to: `${email}`, 
    from: 'jyoyo3811@gmail.com',
    subject: 'Order Confiramtion  !!!!',
    text: 'Hey Your order is confirmed',
    html: '<strong>!!</strong>',
    templateId:'d-3d7aeeee8ed04ed299f8ac2d35863fae',
    dynamic_template_data: {
      "name":`${name}`,
      "timeStamp": `${date}`,
      "dateFormat": "dddd  MMMM,D YYYY ",
      "time":`${time}`
    }
  }

  sgMail
  .send(msg)
  .then(() => {
    res.status(200).json("Email Sent")
  })
  .catch((error) => {
    res.status(500).json(error)
  })
})


module.exports=router;