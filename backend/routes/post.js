const express =require("express");
const { createPost, likeAndDislikePost, deletePost, getPostOfFollowing, updateCaption, addComment, deleteComment } = require("../controllers/post");
const {isAuthenticated} = require("../middlewares/auth");
// const upload = require('../middlewares/multerConfig'); // Adjust the path as necessary


const router = express.Router();

router.route("/post/upload").post(isAuthenticated,createPost);

router
    .route("/post/:id")
    .get(isAuthenticated,likeAndDislikePost)
    .put(isAuthenticated,updateCaption)
    .delete(isAuthenticated,deletePost);

router.route("/posts").get(isAuthenticated,getPostOfFollowing);

router
    .route("/post/comment/:id")
    .put(isAuthenticated,addComment)
    .delete(isAuthenticated,deleteComment);

module.exports=router;
