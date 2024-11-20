import React, { useState, useEffect, useContext, useRef } from "react";
import axiosInstance from "../../axiosInstance";
import { BlogContext } from "../BlogContext";
import axios from 'axios';

const AllBlogs = ({ socket }) => {
  const [error, setError] = useState(null);
  const [blogNotify, setBlogNotify] = useState(null);
  const { blogs, setBlog } = useContext(BlogContext);

  const TitleRef = useRef();

  // const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ||  "http://localhost:8000";


  // // const[count,setCount]=useState(0)
  // const userId=localStorage.getItem("AdminId")

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${BACKEND_URL}/`);
  //     setData(response.data); // Update state with the fetched data
  //   } catch (error) {
  //     console.error('Error fetching data from backend:', error);
  //   }

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ||  "http://localhost:8000";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/api/blogs`);
        // const{body}=response.data
        setBlog(response.data.blogs);
        // setBlog(response.data.)
      } catch (error) {
        setError(error);
      }
    };
    fetchBlog();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("AdminId");
    const token = localStorage.getItem("token");
    // const savedNotifyData= localStorage.getItem("blogNotify");

    if (socket && socket.current) {
      if (userId && token) {
        const fetchBlogNotify = () => {
          socket.current.emit("GetNotification");
        };

        // Emit notification fetch request on mount
        fetchBlogNotify();

        socket.current.on("NewBlogNotify", (notifyData) => {
          if (notifyData) {
            // const notifyArray= JSON.parse(notifyData)
            const userNotification = notifyData.filter(
              (item) => item.createdBy !== userId
            );
            setBlogNotify(userNotification);
            // Save notifications to localStorage
            localStorage.setItem(
              "blogNotify",
              JSON.stringify(userNotification)
            );
            console.log("Received Notification:", notifyData);
          }
        });

        // Cleanup listener on component unmount
        return () => {
          socket.current.off("NewBlogNotify");
        };
      }
    }
  }, []);

  useEffect(() => {
    if (TitleRef.current) {
      TitleRef.current.style.height = "auto";

      // Adjust the height of the input based on scrollHeight
      TitleRef.current.style.height = `${TitleRef.current.scrollHeight}px`;
    }
  }, [blogs]);

  if (!blogs) {
    return <p>Loading....</p>;
  }

  if (blogs.length === 0) {
    return <p>No blogs Available</p>;
  }

  console.log(blogs);

  return (
    <div class="w-full laptop-l:flex laptop:flex  justify-center mt-16 l:px-5 s:px-3 ">
      <div>
        {blogs ? (
          blogs.map((item, index) => (
            <a
              class="laptop-l:w-[680px] laptop:w-[680px] tablet:w-[680px] tablet:mx-24 laptop-l:flex laptop:flex tablet:flex l:flex s:flex mb-20 border-b-2 border-slate-100"
              href={`/blog/${item._id}`}
            >
              <div>
                <div className="laptop-l:flex laptop:flex tablet:flex l:flex s:flex">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    width="30.532px"
                    height="30.532px"
                    viewBox="0 0 45.532 45.532"
                    className="mb-2"
                  >
                    <g>
                      <path
                        d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765
		S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53
		c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012
		c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592
		c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"
                      />
                    </g>
                  </svg>
                 <p class="laptop-l:w-[464px] ml-4 s:ml-1 s:w-[206px] s:pl-2 s:font-semibold">
                    Blog Created by {item.createdBy.firstname}
                  </p> 
                </div>

                {/* Blog Title */}
                <div className="flex justify-start  tablet:text-4xl font-semibold text-base  l:text-xl l:justify-center s:text-2xl">
                  <textarea
                    ref={TitleRef}
                    value={item.title}
                    className="laptop-l:w-[464px] laptop:w-[464px] tablet:w-[450px] l:w-[377px]  m:w-[327px] m:h-[120px] s:w-[272px]  cursor-pointer overflow-hidden focus:outline-none resize-none"
                    type="text"
                    name="title"
                    required
                  />
                </div>
                {/* <span>{item.body}</span> */}
                <div class="laptop-l:flex  laptop:flex  tablet:flex l:flex s:flex mt-8">
                  <span class="mx-2  text-1xl font-semibold">Oct 17</span>

                  {/* Message */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="mx-2"
                  >
                    <path d="M18.006 16.803c1.533-1.456 2.234-3.325 2.234-5.321C20.24 7.357 16.709 4 12.191 4S4 7.357 4 11.482c0 4.126 3.674 7.482 8.191 7.482.817 0 1.622-.111 2.393-.327.231.2.48.391.744.559 1.06.693 2.203 1.044 3.399 1.044.224-.008.4-.112.486-.287a.49.49 0 0 0-.042-.518c-.495-.67-.845-1.364-1.04-2.057a4 4 0 0 1-.125-.598zm-3.122 1.055-.067-.223-.315.096a8 8 0 0 1-2.311.338c-4.023 0-7.292-2.955-7.292-6.587 0-3.633 3.269-6.588 7.292-6.588 4.014 0 7.112 2.958 7.112 6.593 0 1.794-.608 3.469-2.027 4.72l-.195.168v.255c0 .056 0 .151.016.295.025.231.081.478.154.733.154.558.398 1.117.722 1.659a5.3 5.3 0 0 1-2.165-.845c-.276-.176-.714-.383-.941-.59z"></path>
                  </svg>
                </div>
              </div>
              <div class="mt-8">
                <img
                  src={`http://localhost:8000${item.blogImages}`}
                  className="laptop-l:w-[190px] laptop:w-[180px] tablet:w-[190px] tablet:h-28 laptop:h-24 laptop-l:h-28 l:w-[100px] l:h-20 mb-8 s:w-[230px] s:h-16 "
                />
              </div>
            </a>
          ))
        ) : (
          <p>No Blogs Available</p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
