const mongoose=require("mongoose");

const postSchema = new mongoose.Schema({

    caption:String,

    // image: {
    //     type: String, // Use a string to store the image path or URL locally
    //     required: true,
    //   },
    image: {
        public_id: String,
        url: String,
      },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

    createdAt:{
        type:Date,
        default:Date.now,
    },

    likes:[
        {
        type:mongoose.Schema.Types.ObjectId,
         ref:"User",
        },
    ],

    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",

            },
            comment:{
                type:String,
                required:true, 
            },
        },
    ],


});

module.exports=mongoose.model("Post",postSchema)

// const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

// module.exports = Post;
