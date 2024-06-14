const express = require("express");
const path = require('path');
const { connectDatabase } = require("./config/database");
const fileupload = require('express-fileupload'); 

const app = express();
// connectDatabase();
const cookieparser = require("cookie-parser");
const cors = require('cors');


if(process.env.NODE_ENV!=="production"){
require("dotenv").config({path:"backend/config/config.env"})
}

// Using middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(fileupload({useTempFiles: true}))

//Importing routes
const post = require("./routes/post");
const user = require("./routes/user");
const chatRoutes = require("./routes/chatRoutes");

//Using routes
app.use("/api/v1",post);
app.use("/api/v1",user);
app.use("/api/v1",chatRoutes);

module.exports=app; 