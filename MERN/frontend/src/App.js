import React,{useState,useRef,useEffect,useContext} from "react";

//SignIn Authentication Pages
import Signin from "./components/SignUpAuthentication/Signin";
import Signup from "./components/SignUpAuthentication/Signup";

// Rputes Handling
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserFeature/UserInfo"; // Assume this is your user profile component
import AddBlog from "./components/BlogsFeature/AddBlog";
import BlogInfo from "./components/BlogsFeature/BlogInfo"
import AllBlogs from "./components/BlogsFeature/AllBlogs"
import Navbar from "./components/Navbar";
import UpdateBlog from "./components/BlogsFeature/UpdateBlog";

// 
import { BlogContext } from "./components/BlogContext";

import io from "socket.io-client"

const App = () => {
  const socket = useRef(null);

  const{messageIsOpen}=useContext(BlogContext)
  const[setUser]=useState(null)

  // const[count,setCount]=useState(0)
  const userId=localStorage.getItem("AdminId")



  // Receving Upcoming request from the server for Building WebSocket server
  useEffect(() => {
    socket.current = io('http://localhost:8000');
    socket.current.emit("fetchUserInfo", (userId))

    socket.current.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.current.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    // Getting All pending Notification when user start server
    socket.current.emit("GetNotification",(userId))

    socket.current.on("userdetails", (userInfo) => {
      if (userInfo) {
        setUser(userInfo); // Set user info received from server
      }
    });

    // Keep Fetching the data 
    socket.current.on("NewBlogNotify", (notifyData) => {
      if(socket&& socket.current){
        if (notifyData) {
          // Save notifications to localStorage
          localStorage.setItem("blogNotify", JSON.stringify(notifyData));
          console.log("Received Notification:", notifyData);
       }
      }
      
  });
    // Clean up on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);





  return (
    <div className={`${messageIsOpen?"overflow-hidden":""}`}>
      <Navbar socket={socket} />
      <Router>
        <Routes>
          <Route path="/user/signIn" element={<Signin socket={socket} />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/blog/addblog" element={<AddBlog  socket={socket}/>} />
          <Route path="/blog/:id" element={<BlogInfo socket={socket}/>} />
          <Route path="/" element={<AllBlogs socket={socket}/>} />
          <Route path="/update/:id" element={<UpdateBlog />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;