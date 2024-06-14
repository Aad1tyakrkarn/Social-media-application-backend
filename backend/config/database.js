const mongoose = require("mongoose");

exports.connectDatabase=async()=>{
//    await mongoose.connect(process.env.MONGO_URI)
       await mongoose.connect("mongodb://localhost:27017/SocialMedia5")
    .then(con=>console.log(`Database connected: ${con.connection.host}`))
    .catch((err)=>console.log(err));
}