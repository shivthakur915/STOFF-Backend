const router=require("express").Router();
const User=require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    name:req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );
        if(!user){
           res.status(401).json("Wrong User Name");
        }else{
        	const hashedPassword = CryptoJS.AES.decrypt(
        		user.password,
        		process.env.PASS_SEC
        		);
        	const Password = hashedPassword.toString(CryptoJS.enc.Utf8);

        	if(Password != req.body.password){
        		res.status(401).json("Wrong Password");
        	}else{
        		const accessToken = jwt.sign(
        			{
        				id: user._id,
        				isAdmin: user.isAdmin,
        			},
        			process.env.JWT_SEC,
        			{expiresIn:"3d"}
        			);

        		const {password,...other}=user._doc;
            console.log("Logged in");
        		res.status(200).json({...other,accessToken});
        	}
        }	
  }catch(err){
        res.status(500).json(err);
    }
});


router.put("/reset",async (req,res)=>{

})
module.exports=router;