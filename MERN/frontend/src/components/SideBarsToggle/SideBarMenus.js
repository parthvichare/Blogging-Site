import React,{useContext,useEffect,useState} from 'react'
import { BlogContext } from '../BlogContext';
import axiosInstance from '../../axiosInstance';
import { useNavigate, useParams } from "react-router-dom";

const SideBarMenus = ({menuisopen,handleDelete}) => {

  const{message,setMessage,blogs,setBlog}=useContext(BlogContext)
  const navigate=useNavigate()
  const adminId=localStorage.getItem("AdminId")
  const{id}=useParams()
  const[error,setError]=useState(null)

  console.log("Blogs SideBar",blogs)




  const handledeleteblog = async (id) => {
    const createdBy = localStorage.getItem("createdBy");
    // console.log(createdBy)
    if (adminId === createdBy) {
      try {
        const response = await axiosInstance.delete(`/blog/${id}`);
        const { message } = response.data;
        console.log(blogs);
        setMessage(message); // Set success message
        // setBlog((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        setBlog((prevBlogs)=>(Array.isArray(prevBlogs)? prevBlogs.filter((blog)=>blog.id!==id):[]))
        navigate("/"); // Redirect to home page
      } catch (error) {
        setError(error.message)
      }
    } else {
      console.log("You are not created this Blog");
    }
  };

  return (
    <div class="relative">
      {menuisopen && (
        blogs.createdBy._id===adminId?(
          <div
          className={`absolute top-0 right-0 h-20 w-[243px] bg-white z-10 p-2 border-2 border-gray-200`}
        >
          <div className="justify-start ml-3">
            <a href={`/update/${id}`}>
              <p className="text-xl">Edit Story</p>
            </a>
          </div>
          <div className="justify-start ml-3 pt-2">
            <button type="button" onClick={() => handledeleteblog(id)}>
              <p className="text-xl text-red-600">Delete Story</p>
            </button>
          </div>
          {error && <p>{error}</p>}
        </div>
        ):(
        <div
          className={`absolute top-0 right-0 h-12 w-[200px] bg-white z-10 p-2 border-2 border-gray-200`}
        >
          <div className="justify-start ml-3">
            <button>
              <p className="text-xl">Report Story</p>
            </button>
          </div>
        </div>
        )
      )}
    </div>
  );
}

export default SideBarMenus