import React,{useContext} from 'react'
import { BlogContext } from '../BlogContext'
import axiosInstance from "../../axiosInstance";


const SideBarCommentMenu = ({commentInfo}) => {
    const{commentmenu, message, setMessage,blogs,setBlog}= useContext(BlogContext)
    const adminId=localStorage.getItem("AdminId")
    // const{blogs,setBlog,commentmenu,setCommentMenu,commentdata, setCommentdata, message, setMessage}=useContext(BlogContext)

    const DeleteCommentReq = async (commentId) => {
      try {
        const response = await axiosInstance.delete(`/blog/comment/${commentId}`);
        const { message } = response.data;
        setMessage(message);
        window.location.reload();
        // setComment((prevComments)=>prevComments.filter((comment)=>comment.id!==id));
      } catch (error) {
        console.log("Error", error);
      }
    };

    
  //Delete Comment
  const handledeleteComment = (createdBy, commentId) => {
    //Admin have access of deleting comments of user
    if (blogs.createdBy._id === adminId || adminId === createdBy) {
      DeleteCommentReq(commentId);
    } else {
      console.log("You can not Access");
    }
    return createdBy;
  };


  return (
    <div>
     {commentmenu  && (
       <div className="justify-start py-2 bg-slate-200 border-2 border-gray-50 w-44 px-10 fixed left-32">
        {commentInfo.createdBy._id===adminId ?(
          <button onClick={()=>handledeleteComment(commentInfo.createdBy._id,commentInfo._id)}  type="button">Delete Story</button>
        ):(
          <button>reply</button>
        )}
      </div>
     )}
    </div>
  )
}

export default SideBarCommentMenu