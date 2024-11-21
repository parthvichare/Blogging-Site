import React, { useState, useEffect, useContext,useRef } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "mongoose";
import UserPostToolBar from "../UserFeature/UserPostToolBar";
import { BlogContext } from "../BlogContext";

const BlogInfo = ({ socket }) => {
  const adminId = localStorage.getItem("AdminId");
  const tokenId = localStorage.getItem("token");

  const containerRef=useRef(null)

  //To Insert Image

  const BACKEND_URL= process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'


  const{blogs,setBlog, messageIsOpen}=useContext(BlogContext)

  const [error, setError] = useState(null);
  const { id } = useParams();
  const ContentRef=useRef()
  const TitleRef=useRef()

  //Comments States
  const [comment, setComment] = useState(null);
  const [commentdata, setCommentdata] = useState(null);
  const [message, setMessage] = useState(null);


  const [blogNotify, setBlogNotify] = useState(null);
  const [notification, setNotification] = useState(null);
  const { menuisopen } = useContext(BlogContext);


  const navigate = useNavigate(); // Initialize navigate


  //Fetching Blog according to specific BlogId
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${id}`);
        const { blog } = response.data;
        console.log(blog);
        setBlog(blog); // Assuming `response.data.blog` exists
        const createdBy = blog.createdBy._id;
        localStorage.setItem("createdBy", createdBy);
      } catch (error) {
        setError(error.message); // Set the error message
      }
    };
    fetchBlog();
  }, [id]);

  console.log("Blog", blogs);


  // Handle Change based on the Input
  const handleChange = (e) => {
    console.log(e.target.value);
    setComment({ ...comment, [e.target.name]: e.target.value });
  };


  //Fetching Comments of All user
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axiosInstance.get(`/blog/comment/${id}`);
        const { commentInfo } = response.data;
        setCommentdata(commentInfo);
      } catch (error) {
        console.log(`Error is ${error}`);
      }
    };
    fetchComment();
  }, [id]);




  // const handleUpdateChange=(e)=>{
  //   setUpdateBlog({...updateBlog,[e.target.name]:e.target.value})
  // }

  // Edit Blog
  const handleEditBlog = async (blogId) => {
    try {
      const response = await axiosInstance.patch(`/blog/update/${id}`);
      const { updateMessage } = response.data;
      setMessage(updateMessage);
      setMessage(`Hello ${blogId}`);
      navigate(`/updateBlog/${blogId}`);
    } catch (error) {
      setError(error.message);
    }
  };

  //It Mount when the other user added New Blog and it will fetch the Added Blog details
  useEffect(() => {
    const userId = localStorage.getItem("AdminId");

    if (socket && socket.current) {
      const fetchBlogNotify = () => {
        if (userId) {
          socket.current.emit("GetNotification", userId);
        }
      };
      fetchBlogNotify();
      socket.current.on("NewBlogNotify", (notifyData) => {
        if (notifyData) {
          setBlogNotify(notifyData);
          console.log("Received Notification:", blogNotify);
        }
      });
    }
  }, [socket]);



  console.log(blogNotify);
  
  useEffect(()=>{
    if(TitleRef.current){
      TitleRef.current.style.height = 'auto';

        // Adjust the height of the input based on scrollHeight
        TitleRef.current.style.height = `${TitleRef.current.scrollHeight}px`;
    }
 },[blogs])

  useEffect(()=>{
    if(ContentRef.current){
        ContentRef.current.style.height = 'auto';

        // Adjust the height of the input based on scrollHeight
        ContentRef.current.style.height = `${ContentRef.current.scrollHeight}px`;
    }
 },[blogs])

  if (error) {
    return <div>Error: {error}</div>; // Display the error if it exists
  }

  if (!blogs) {
    return <div>Loading Blog...</div>;
  }

  if (!commentdata) {
    return <div>Loading Comment...</div>; // Display loading until the blog is fetched
  }

  return (
    <div class={`${messageIsOpen?"":""}`}>
      <div className="w-full h-full flex justify-center items-start laptop-l:justify-center laptop:px-8 border-none overflow-y-hidden mt-6">
        {/* <h1>Blog Created By {blogs.createdBy.firstname}</h1> */}
        <div>
          <div className="flex justify-start  laptop:ml-20 tablet:text-4xl tablet:ml-5 font-extrabold text-4xl px-3 l:text-xl l:justify-center s:text-2xl">
          {/* <h1 className="w-[680px] h-[104px]  tablet:w-[680px] tablet:h-[104px] l:w-[377px] l:h-[76px] m:w-[327px] m:h-[114px] s:w-[272px] s:h-[114px]">
            {blogs.title}
          </h1> */}
            <textarea
              ref={TitleRef}
              value={blogs.title}
              className="w-[680px] tablet:w-[680px] tablet:h-[104px] l:w-[377px] l:h-[76px] m:w-[327px] m:h-[114px] s:w-[272px] s:h-[114px] overflow-hidden focus:outline-none resize-none bg-transparent"
              type="text"
              name="title"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <UserPostToolBar blogs={blogs} />
          </div>
          <div class="l:mx-4 laptop:mx-12">
          <div className={`${menuisopen ? "opacity-50" : ""} relative z-0`}>
            <img
              src={`${BACKEND_URL}${blogs.blogImages}`} // Correct path
              alt="Blog Image"
              className="laptop-l:w-[690px] laptop:w-[650px] tablet:w-[620px] l:w-[360px] s:w-[272px] s:pl-8 m:w-[340px] h-auto mt-4 mb-4  laptop-l:ml-2 laptop:ml-8 tablet:ml-10" 
            />
          </div>
          <div class="laptop-l:w-[680px] laptop-l:mt-6 laptop:w-[640px] tablet:w-[620px] tablet:ml-8 l:w-[320px] l:ml-4 s:mx-4">
            <textarea
              ref={ContentRef}
              value={blogs.body}
              className="w-[680px]   tablet:w-[680px] tablet:h-[104px] l:w-[377px] l:h-[76px] m:w-[327px] m:h-[114px] s:w-[272px] s:h-[114px] font-custom-serif space-x-5 text-2xl overflow-hidden focus:outline-none resize-none bg-transparent"
              type="text"
              name="body"
              onChange={handleChange}
              required
            />
          </div>
          </div>
        </div>
    </div>
    </div>
  );
};

export default BlogInfo;
