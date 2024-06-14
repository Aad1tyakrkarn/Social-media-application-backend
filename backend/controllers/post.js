const Post = require("../models/post");
const User = require("../models/user");
const cloudinary = require("cloudinary")
const path = require('path');

const fileupload = require('express-fileupload'); 






// exports.createPost = async (req, res) => {
//   try {
//     const newPostData = {
//       caption: req.body.caption,
//       image: req.file.filename, // Save the filename of the uploaded image
//       owner: req.user._id,
//     };

//     const post = await Post.create(newPostData);

//     const user = await User.findById(req.user._id);
//     user.posts.push(post._id);

//     await user.save();

//     res.status(201).json({
//       success: true,
//       post,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };











// Normal createPost function

// exports.createPost=async (req,res)=>{
//   try {
//     //console.log((req.body.image));
//     const myCloud = await cloudinary.v2.uploader.upload(req.body.image,{
//       folder:"posts", 
//     });
//     const newPostData={
//         caption:req.body.caption,
//         image:{
//           public_id:myCloud.public_id,
//           url:myCloud.secure_url,
//         },
//         owner:req.user._id,
//        };

//        const post = await Post.create(newPostData);

//        const user = await User.findById(req.user._id)
//        user.posts.push(post._id);

//        await user.save();

//        res.status(201).json({
//         success:true,
//         post,
//        });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//         success:false,
//         message:error.message,
//     })
    
//   }
// }






// function for only 1 post a day
// exports.createPost = async (req, res) => {
//   try {
//       const user = await User.findById(req.user._id);

//       if (!user) {
//           return res.status(404).json({
//               success: false,
//               message: "User not found",
//           });
//       }


//       if (user.restricted) {
//       // Check if user has any posts
//       if (user.posts.length > 0) {
//           // Get the last post ID
//           const lastPostId = user.posts[user.posts.length - 1];
//           // Retrieve the last post
//           const lastPost = await Post.findById(lastPostId);

//           // Check if the last post exists
//           if (lastPost) {
//               const now = new Date();
//               const lastPostTime = new Date(lastPost.createdAt);

//               // Calculate the time difference in hours
//               const diffInMillis = now - lastPostTime;
//               const diffInHours = diffInMillis / (1000 * 60 * 60);
//               // const remainingHours = 24 - diffInHours;

//               // if (remainingHours > 0) {
//               //     return res.status(400).json({
//               //         success: false,
//               //         message: `You can only create one post per day. The remaining hours: ${remainingHours.toFixed(2)}`,
//               //     });
//               // }

//                const remainingHours = 24 - diffInHours;
//                const remainingHoursInt = Math.floor(remainingHours);
//                const remainingMinutes = Math.round((remainingHours - remainingHoursInt) * 60);

//                 if (remainingHoursInt > 0 || remainingMinutes > 0) {
//                     let remainingTimeMessage = `Only one post in a day. You can post again in:  `;
//                     if (remainingHoursInt > 0) {
//                         remainingTimeMessage += `${remainingHoursInt} hour${remainingHoursInt > 1 ? 's' : ''}`;
//                     }
//                     if (remainingMinutes > 0) {
//                         remainingTimeMessage += `${remainingHoursInt > 0 ? ' and ' : ''}${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
//                     }
//                     return res.status(400).json({
//                         success: false,
//                         message: remainingTimeMessage,
//                     });
//                 } else {
//                   // Post creation logic if the last post is older than 24 hours
//                       const myCloud = await cloudinary.v2.uploader.upload(req.body.image,{
//                         folder:"posts", 
//                       });
//                   const newPostData = {
//                       caption: req.body.caption,
//                       image: {
//                           public_id: req.body.public_id,
//                           url: myCloud.secure.url,
//                       },
//                       owner: req.user._id,
//                   };

//                   const post = await Post.create(newPostData);

//                   user.posts.push(post._id);
//                   await user.save();

//                   return res.status(201).json({
//                       success: true,
//                       post,
//                   });
//               }
//           }
//          }
//       } else {
//           // Post creation logic if no previous posts
//           const newPostData = {
//               caption: req.body.caption,
//               image: {
//                   public_id: req.body.public_id,
//                   url: req.body.url,
//               },
//               owner: req.user._id,
//           };

//           const post = await Post.create(newPostData);

//           user.posts.push(post._id);
//           await user.save();

//           return res.status(201).json({
//               success: true,
//               post,
//           });
//       }
//   } catch (error) {
//       res.status(500).json({
//           success: false,
//           message: error.message,
//       });
//   }
// };









// function to create post when restriction is being used-

exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.restricted) {
      // Check if user has any posts
      if (user.posts.length > 0) {
        // Get the last post ID
        const lastPostId = user.posts[user.posts.length - 1];
        // Retrieve the last post
        const lastPost = await Post.findById(lastPostId);

        // Check if the last post exists
        if (lastPost) {
          const now = new Date();
          const lastPostTime = new Date(lastPost.createdAt);

          // Calculate the time difference in hours
          const diffInMillis = now - lastPostTime;
          const diffInHours = diffInMillis / (1000 * 60 * 60);

          const remainingHours = 24 - diffInHours;
          const remainingHoursInt = Math.floor(remainingHours);
          const remainingMinutes = Math.round((remainingHours - remainingHoursInt) * 60);

          if (remainingHoursInt > 0 || remainingMinutes > 0) {
            let remainingTimeMessage = `Only one post in a day. You can post again in: `;
            if (remainingHoursInt > 0) {
              remainingTimeMessage += `${remainingHoursInt} hour${remainingHoursInt > 1 ? 's' : ''}`;
            }
            if (remainingMinutes > 0) {
              remainingTimeMessage += `${remainingHoursInt > 0 ? ' and ' : ''}${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
            }
            return res.status(400).json({
              success: false,
              message: remainingTimeMessage,
            });
          }
        }
      }
    }

    // Post creation logic if no restriction or time restriction passed
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //   folder: "posts",
    // });

    const newPostData = {
      caption: req.body.caption,
      image: {
        // public_id: myCloud.public_id,
        public_id: req.body.public_id,
        // url: myCloud.secure_url,
        url:req.body.url,
      },
      owner: req.user._id,
    };

    const post = await Post.create(newPostData);

    user.posts.push(post._id);

    await user.save();

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};










exports.likeAndDislikePost = async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({
        success:false,
        message:"Post not found"
      });
    }

    if(post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index,1);
      await post.save();

      return res.status(200).json({
        success:true,
        message:"Post Unliked",
      });

    } else {
      post.likes.push(req.user._id);
      await post.save();

      return res.status(200).json({
        success:true,
        message:"Post Liked",
      });
    }


  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }

}


exports.deletePost = async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({
        success:false,
        message:"Post not found"
      });
    } 

    if(post.owner.toString() !== req.user._id.toString()){
      return res.status(401).json({
        success:false,
        message:"Unauthorized access"
      })
    }
    
    await Post.deleteOne({ _id: req.params.id });


    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index,1);

    await user.save();
    
    res.status(200).json({
      success:true,
      message: "Post deleted",
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }

}


// normal function of getPostOfFollowing -

// exports.getPostOfFollowing = async (req,res)=>{
//   try {

//     const user = await User.findById(req.user._id);

//     const posts = await Post.find({
//       owner:{
//         $in: user.following,
//       }
//     });

//     res.status(200).json({
//       success:true,
//       posts
//     })


//   } catch (error) {
//     res.status(500).json({
//       success:false,
//       message:error.message,
//     })
//   }
// }







// getPostOfFollowing when the user restriction is on -
exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get all posts from the users that the current user is following
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    });

    let resultPosts = posts;

    // If user is restricted, reduce the number of posts by half
    if (user.restricted) {
      const halfLength = Math.ceil(posts.length / 2);
      resultPosts = posts.slice(0, halfLength);
    }

    res.status(200).json({
      success: true,
      posts: resultPosts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




exports.updateCaption = async (req,res)=>{
  try {
      const post = await Post.findById(req.params.id);

      if(!post){
          return res.status(404).json({
              success:false,
              message:error.message,
          });
      }

      if(post.owner.toString() !== req.user._id.toString()){
          return res.status(401).json({
            success:false,
            message:"Unauthorized access",
          });
      }

      // const {newCaption}= req.body;
      post.caption = req.body.caption;

      await post.save();
      res.status(200).json({
        success:true,
        message: "Post updated"
      });

  } catch (error) {
      res.status(500).json({
          success:false,
          message:error.message,
      });
  }

}



exports.addComment = async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({
        success:false,
        message:"Post not found",
      });
    }


    let commentIndex = -1;

    //Checking if comment already exists
    post.comments.forEach((item,index) => {
      if(item.user.toString()===req.user._id.toString()) {
        commentIndex=index;
    }
  });

    if(commentIndex !==-1){
      post.comments[commentIndex].comment=req.body.comment;
      await post.save();

      return res.status(200).json({
        success:true,
        message:"Comment Updated",
      });
    }
    else{
      post.comments.push({
        user:req.user._id,
        comment:req.body.comment,
      });

      await post.save();
      return res.status(200).json({
        success:true,
        message:"Comment added",
      })
    }



  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}




exports.deleteComment = async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({
        success:false,
        message:"Post not found",
      });
    }


    // Checking if owner wants to delete
    if(post.owner.toString() === req.user._id.toString()){
      if(req.body.commentId === undefined){
        return res.status(400).json({
          success:false,
          message:"Comment ID is required"
        })
      }

        post.comments.forEach((item,index)=>{
          if(item._id.toString()=== req.body.commentId.toString()){
            return post.comments.splice(index,1);
          }
        });

        await post.save();

        return res.status(200).json({
          success:true,
          message:"Selected comment deleted"
        })
    }else{
    post.comments.forEach((item,index) => {
      if(item.user.toString()===req.user._id.toString()) {
        return post.comments.splice(index,1);
    }
  });
    await post.save();
    return res.status(200).json({
      success:true,
      message:"Your comment has been deleted",
    })
  }

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    });
  }
}




