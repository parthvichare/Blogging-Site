const path=require("path")
const express=require("express");
const cookieParser=require("cookie-parser")

//Mongoose help for Connecting to DataBase
const mongoose= require("mongoose")

const jwt = require('jsonwebtoken');

//Models for Query/Adding Data
const Blog= require("./models/blogs");
const User=require("./models/user");
const BlogNotify=require("./models/BlogNotify")

const userRouter = require("./routes/users")
const blogRouter =require("./routes/blog")
const cors = require('cors');

const { validateToken } = require("./services/authetication");

const {
    checkForAuthenticationCookie,
}=require("./authetication")


const app=express();

//PORT on which our server start
const PORT = 8000

app.use(express.json())

//File-System
const fs = require('fs');


// Connecting webSocket.io
const http= require("http")
const server=  http.createServer(app)
const socketIo = require("socket.io")
const io = socketIo(server,{cors:{origin:"http://localhost:3000"}})

//Multer for Storing Image/files
const multer = require('multer');


//Connect MongoDb to Server
// const mongoose = require('mongoose');

// Use the service name `mongo` as defined in the docker-compose.yml file
// const uri = 'mongodb://mongo:27017/blogCollections';

// Connection options for improved compatibility and performance
// mongoose.connect("mongodb://127.0.0.1:27017/blogCollections")
//     .then(async () => {
//         console.log("MongoDB successfully connected with server:8000");

//     })
//     .catch(async(err=Error)=>console.log("Error is",err))


//Connect MongoDb to Server
mongoose.connect("mongodb://127.0.0.1:27017/blogCollections")
    .then(async () => {
        console.log("MongoDB successfully connected with server:8000");

    })
    .catch(async(err=Error)=>console.log("Error is",err))



//View ejs
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))


//Middleware Allowance to all routes ENDPOINT
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use(express.json({ limit: '10mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//GET Method request
// app.get("/",(req,res)=>{
//     return res.send("hello")
// })

// User Profile
app.get("/user_profile/:id", async (req, res) => {
    try {
        // Fetch user details using the ID from the URL
        const user_detail = await User.findById(req.params.id);

        if (!user_detail) {
            return res.status(404).send("User not found");
        }

        // Render the user_profile view and pass user details
        return res.render("user_profile", { user_details: user_detail });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});

app.use(cors());


io.on("connection",(socket)=>{

    socket.emit("message",{message:"Hello from the server"})

    socket.on("fetchUserInfo",async(AdminId)=>{
        try{
            const userInfo= await User.findById(AdminId)
            const blogNotify= await BlogNotify.find({})
            // console.log(`User ${userInfo.firstname} is connected`)
            console.log(`${userInfo.firstname} is Connected`)
            socket.emit("fetchNewNotify",{noification:blogNotify})
        }catch(error){
            console.log("Random User Connected")
        }
    })


    socket.on("AddBlog", async (blogData, base64Image) => {
      const { title, body, createdBy } = blogData;
  
      try {
        // If there's an image, decode and save it
        if (base64Image) {
          const buffer = Buffer.from(base64Image, 'base64'); // Convert the base64 string to a buffer
          const imageName = `${Date.now()}-image.png`; // Generate a unique filename
          const imagePath = path.join(__dirname, 'uploads', imageName);
  
          // Save the file to the 'uploads' folder
          fs.writeFileSync(imagePath, buffer);
  
          // Save the blog in the database with the image path
          const blog = await Blog.create({
            title,
            body,
            blogImages: `/uploads/${imageName}`, // Store the path to the saved image
            createdBy,
          });
  
          const blogDataWithOwner = await Blog.findById(blog._id).populate("createdBy");
          const blogOwner = { _id: blog._id, blog: blogDataWithOwner };
  
          // Emit the blog details back to the client
          socket.emit("Userdetails", blogOwner);
  
        } else {
          // If no image is provided, just save the blog
          const blog = await Blog.create({
            title,
            body,
            createdBy,
          });
  
          const blogDataWithOwner = await Blog.findById(blog._id).populate("createdBy");
          const blogOwner = { _id: blog._id, blog: blogDataWithOwner };
  
          // Emit the blog details back to the client
          socket.emit("Userdetails", blogOwner);
        }
      } catch (error) {
        console.error("Error adding blog:", error);
        socket.emit("Error", { error: `Error: ${error.message}` });
      }
    });

    socket.on("NewBlogAdded",async(data)=>{
        if(data){
            const{blogInfo}= data
            try{
               const blogNotify = await BlogNotify.create({
                 message: `${blogInfo.createdBy.firstname} added New Blog`,
                 createdBy: blogInfo.createdBy._id,
                 blogId: blogInfo._id
               })
            //  const newBlogAddedNotify = await BlogNotify.findById(blogNotify.blogId)
            //  io.emit("NewBlogNotify",newBlogAddedNotify)
            }catch(error){
                console.error(error.message)
            }
            console.log(`${blogInfo.createdBy.firstname} added New Blog`)
        }
    })


    socket.on("GetNotification", async (userId) => {
           if(userId){
            try {
                const newBlogAddedNotify = await BlogNotify.find({});
                // Send notifications only to the user requesting it
                io.emit("NewBlogNotify", newBlogAddedNotify);
            } catch (error) {
                console.error("Error fetching notifications:", error.message);
            }
           }
    });

})



app.post('/api/data', (req, res) => {
    try {
        const token=req.cookies[cookieName];
        const userPayload = validateToken(token); // Validate the token
        req.user = userPayload; // Attach user info to the request
        console.log(req.user);
        return res.json({ message: 'Data received', data: req.body });
    } catch (error) {
        console.log("Error is", error);
        return res.status(403).json({ error: "Invalid token" }); // Respond with an error if token validation fails
    }
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // If expecting JSON payloads in other requests

app.get("/", (req, res) => {
    res.send("Hello World");
});


//Home routes
app.use("/user",userRouter);
app.use("/blog",blogRouter);

//Listening all req on the sever PORT:8000
server.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})