const express = require("express");
const router = express.Router();
const path = require("path");
const Blog= require("../models/blogs");
const Comment =require("../models/comment")
const{checkForAuthenticationCookie}=require("../authetication")
const multer= require("multer");


router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
      user: req.user
  });
});



const storage= multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,path.resolve(`./Public/uploads`));
  },
  filename: function(req,file,cb){
    const fileName= `${Date.now()}-${file.originalname}`
    cb(null,fileName);
  },
});

const upload= multer({storage:storage})



// Route to create a new blog
router.route('/',checkForAuthenticationCookie).post(async (req, res) => {
  const { title, body } = req.body;
  
  if (!req.user) {
      return res.status(401).send("Unauthorized");
  }

  try {
      const blog = await Blog.create({
          title,
          body,
          createdBy: req.user.id,
      });
      return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
      console.error(error);
      return res.status(500).send("Error creating blog");
  }
}).get(async (req, res) => {
  const blogInfo = await Blog.find({}).populate("createdBy");
  return res.render("home", {
      blogs: blogInfo,
      user: req.user
  });
});


router.post("/comment/:blogId",async(req,res)=>{
  const{content,blogId,user}=req.body
  try{
    const commentInfo=await Comment.create({
      content: content,
      blogId: blogId,
      createdBy: user,
    })
    console.log("Hello")
    // const commentdata= await Comment.findById(commentInfo._id)
    // console.log(commentdata)
    return res.json({commentInfo, message:"Comment Created Successfully!"})
  }catch(error){
    return res.status(500).send("Error adding comment");
  }
})


router.get("/api/blogs",async(req,res)=>{
  console.log("All Blogs")
   try{
    const AllBlogs= await Blog.find({}).populate("createdBy")
    return res.json({blogs:AllBlogs})
   }catch(error){
    return res.json({Error:error})
   }
})



router.get("/:id", async(req,res)=>{
  try{
    const blogs= await Blog.findById(req.params.id).populate("createdBy")
    return res.json({blog:blogs})
  }catch(error) {
    return res.json({Error:error})
  }
})


router.get("/comment/:id",async(req,res)=>{
  try{
    const comments= await Comment.find({blogId:req.params.id}).populate('createdBy')
    console.log("Hello")
    return res.json({
      commentInfo:comments
    })
  }catch(error){
    return res.json({Error:error})
  }
})




//Handle Delete Blog By Id
router.delete("/:id",async(req,res)=>{
  try{
    await Blog.findByIdAndDelete(req.params.id);
    return res.json({message:"Blog get deleted"})
  }catch(error){
    console.log(error.message)
  }
})


// Delete Operation
router.delete("/comment/:id",async(req,res)=>{
  try{
    const commentdelete= await Comment.findByIdAndDelete(req.params.id);
    console.log("Dlete the comment")
    return res.json({message:`Comment get deleted ${commentdelete._id}`})
  }catch(error){
    return res.json({Error:error.message})
  }
})


//Updating Blog
router.patch("/updateBlog/:id",async(req,res)=>{
  // const{title,body}=req.body.
  const{_id,title,body}=req.body
  try{
    if(_id){
      const a= await Blog.findById(_id).updateOne({_id:_id,title:title,body:body})
      console.log("Blog Get successfully updated")
      return res.json({successmessage:"Blog Get successfully updated"})
    }else{
      console.log("False")
    }
  }catch(error){
    console.error(error.message)
  }
})


module.exports = router;



