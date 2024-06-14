const mongoose= require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a name"]
    },

    avatar:{
        public_id:String,
        url:String,
    },

    email:{
        type:String,
        required:[true,"Please enter an email"],
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlength:[6,"Password must be atleast 6 characters"],
    },

    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
        }
    ],

    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

        }
    ],

    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

        }
    ],


    resetPasswordToken:String,
    resetPasswordExpire:Date,
    lastPostTime: { // New field to track the last post time
        type: Date,
    },
    restricted: {
        type: Boolean,
        default: true,
      },

});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10)
    }
    next();
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.generateToken= function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}

userSchema.methods.getResetPasswordToken = function(){
    

    // // Generate a random token of 20 bytes (e.g., "a1b2c3d4")
    const resetToken = crypto.randomBytes(20).toString("hex");

    console.log(resetToken);


    // the reset token is hashed using the SHA-256 hashing algorithm
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() +10*60*1000;

    return resetToken;

}

module.exports=mongoose.model("User",userSchema);

// const User = mongoose.models.User || mongoose.model('User', userSchema);
// module.exports = User;