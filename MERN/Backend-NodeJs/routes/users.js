const express=require('express');
const router=express.Router();
const User = require("../models/user")
const multer = require('multer');
const path = require("path");


//File Handling with Multer(Uploading Images, files)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  
const upload = multer({ storage: storage });



//signIn=login, signUp= Creating account
router.get("/signUp",(req,res)=>{
    return res.render("signUp")
})

router.post("/api/signUp", async (req, res) => {
    try {
        const { firstname, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Return error response if user already exists
            console.log("User already exists:", existingUser);
            return res.status(400).json({ userexist: "User already exists" });
        }


        // Create new user if doesn't exist
        const newUser = await User.create({
            firstname,
            email,
            password // You should hash the password before storing
        });

        const user=await User.findOne({email})

        // Return success message with user ID
        return res.status(201).json({ _id: newUser._id,user, message: "User created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

 
router.get("/signIn",(req,res)=>{
    return res.render('signIn')
})


//Listening for POST request which we are getting from the client side
router.post("/api/signin",async(req,res)=>{
    const{email,password}=req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password)
        const user = await User.findOne({email})
        return res.json({
            Loginstatus:"Login Successfully",
            token:token,
            user:{
                id:user.id,
                email:user.email,
                firstname:user.firstname,
            }
        })
    }catch(error){
        return res.json({
            error:"Invalid email & password"
        })
    }
})


router.post("/logout", (req, res) => {
    // Clear the 'token' cookie
    console.log("Hello")
    res.clearCookie("token", { httpOnly: true, secure: true }); // secure=true for HTTPS only

    // Optionally, send a success message back
    return res.status(200).json({ message: "Logout successful" });
});

router.get("/:id",async(req,res)=>{
    try{
        const user= await User.findById(req.params.id)
        return res.json({
            users:user
        })
    }catch(error){
        return res.json({Error:error})
    }
})



module.exports=router;