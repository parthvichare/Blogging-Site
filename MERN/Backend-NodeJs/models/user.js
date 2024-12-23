const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");
const{createTokenForUser}=require("../services/authetication");


const userSchema= new Schema(
    {
    firstname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
    },
    role:{
        type:String,
        role:"User"
    },
    profileImageUrl:{
        type:String,
        required:false,
    }
},
{timestamps:true}
)


// userSchema.pre is used for storing the password which is submitted wile signup and then it get stored with by generating salt,hashedPassword(salt + password user has given)
userSchema.pre("save",function(next){
    const user=this;

    if(!user.isModified("password")) return;

    const salt=randomBytes(16).toString("hex");
    const hashedPassword= createHmac("sha256",salt)
       .update(user.password)
       .digest("hex")
    console.log(hashedPassword)

    this.salt=salt;
    this.password=hashedPassword;

    next();
})


//userSchema.static is used when user login and submit password which it combine with existing salt-code and if its match with existing hashed-code then we generate JWT-Token on user browser
userSchema.static(
    "matchPasswordAndGenerateToken",
    async function(email,password){
        const user=await this.findOne({email});
        if(!user) throw new Error("User Not Found");

        const salt=user.salt;
        const hashedPassword=user.password;

        const userProvidedHash = createHmac("sha256",salt)
                                .update(password)
                                .digest("hex")
        console.log("Provided password",userProvidedHash)                    

        if(hashedPassword !== userProvidedHash){
            throw new Error("Incorrect Password")
        }

        const token= createTokenForUser(user)
        return token
    }
)

const User = model("User", userSchema);

module.exports = User;
