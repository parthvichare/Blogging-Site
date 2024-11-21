import React,{useState,useEffect,useContext,useRef} from 'react';
import { BlogContext } from '../BlogContext';
import axiosInstance from "../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import SideBarCommentMenu from './SideBarCommentMenu';

const SideBarMessagebox = ({toggleMessagebox }) => {

  const [comment, setComment] = useState(null);

  const {
    blogs,
    commentmenu,
    setCommentMenu,
    commentdata,
    setCommentdata,
    setMessage,
    activeCommentId,
    setActiveCommentId,
    user,
    setUser
  } = useContext(BlogContext);
  const { id } = useParams();

  const commentRef=useRef(null)
  console.log(commentmenu)
  // console.log("Comment Sizes",commentRef.current)

  const containerRef=useRef(null)
  const commentMessageRef=useRef(null)
  // console.log("Comment Sizes",commentMessageRef.current)

  const{messageIsOpen}=useContext(BlogContext)

  console.log(commentdata)

  const adminId=localStorage.getItem("AdminId")
  const tokenId= localStorage.getItem("token")

    // Handle Change based on the Input
    const handleChange = (e) => {
      console.log(e.target.value);
      setComment({ ...comment, [e.target.name]: e.target.value });
    };

    const commentData = {
      ...comment,
      blogId: id,
      user: adminId,
      tokenId: tokenId,
    };

  
    // //Handle Comment Submission!
    const handleCommentSubmit = async (event) => {
      event.preventDefault()
      const blogId = blogs._id;
      // const createdBy=localStorage.getItem("createdBy")
      if (adminId) {
        try {
          const response = await axiosInstance.post(
            `/blog/comment/${blogId}`,
            commentData
          );
          window.location.reload()
          const { message } = response.data;
          setMessage(message);
        } catch (error) {
          console.log(`Error is ${error}`);
        }
      } else {
        setMessage("LogIn for Making comment");
      }
    };
  
    //Fetching Comments of All user
    useEffect(() => {
      const fetchComment = async () => {
        try {
          const response = await axiosInstance.get(`/blog/comment/${id}`);
          const { commentInfo } = response.data;
          setCommentdata(commentInfo);
          // console.log("Comment",commentdata)
        } catch (error) {
          console.log(`Error is ${error}`);
        }
      };
      fetchComment();
    }, [id]);


      
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(`/user/${adminId}`);
          const { user, Anoynomus_users } = response.data;
    
          if (!user) {
            // If user is null, display the anonymous user message
            setUser(Anoynomus_users || "No user found");
          } else {
            setUser(user);
          }
    
          console.log(user); // Log the user or message
        } catch (error) {
          console.log("Error fetching user:", error);
          setUser("Error fetching user");
        }
      };
    
      fetchUser();
    }, [id]); // Ensure the dependency is correct

    console.log(user)


    

  // useEffect(() => {
  //   const createdById = () => {
  //     if (blogs) {
  //       //Admin Delete button Access
  //       if (blogs.createdBy._id === adminId) {
  //         setAdminDelComment(true);
  //       }
  //     } else {
  //       setAdminDelComment(false);
  //     }
  //     if (commentdata) {
  //       for (let i = 0; i < commentdata.length; i++) {
  //         const comment = commentdata[i];
  //         if (comment.createdBy._id === adminId) {
  //           // console.log("All",comment)                    //User comment delete button Access
  //           // console.log("Hello Comments")
  //           setAdminDelComment(true);
  //         }
  //       }
  //     }
  //   };
  //   createdById();
  // });

  useEffect(() => {
    if (messageIsOpen) {
      // Apply overflow-hidden to body
      document.body.style.overflow = 'hidden';
    } else {
      // Remove overflow-hidden from body
      document.body.style.overflow = '';
    }

    // Cleanup function to reset overflow when component unmounts or `messageIsOpen` changes
    return () => {
      document.body.style.overflow = '';
    };
  }, [messageIsOpen]);

  const autoResize = () => {
    if (commentRef.current) {
      // Adjust the height of the textarea
      commentRef.current.style.height = 'auto';                                                        
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;

      // Adjust the height of the container based on the textarea's scroll height
      // containerRef.current.style.height = `${commentRef.current.scrollHeight + 100}px`; // Adjust "100" as needed
    }
  };

  const autoMessageResize = () => {
    if (commentMessageRef.current) {
      commentMessageRef.current.style.height = 'auto'; // Reset height
      commentMessageRef.current.style.height = `${commentMessageRef.current.scrollHeight}px`; // Set to scroll height
    }
  };


  const toggleCommentMenus=(comment)=>{
    if(activeCommentId===comment._id){
      setCommentMenu(false)
      setActiveCommentId(null)
    }else{
      setCommentMenu(true)
      setActiveCommentId(comment._id)
    }
  }


  if(!commentData){
    return <p>Loading....</p>
  }



  return (
    <div>
      <div
        className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-x-hidden ${
          messageIsOpen ? "translate-x-0 z-20" : "translate-x-full"
        }`}
      >
        <div className="laptop-l:flex inline-block justify-between m-6">
          <p className="text-2xl">Response</p>
          <button
            onClick={toggleMessagebox}
            className="top-4 left-4 text-gray-500 hover:text-gray-700 text-3xl"
          >
            X
          </button>
        </div>
        <div></div>

        {/* Comment Submission Box */}
        <div
          // ref={containerRef}
          class="top-20 bg-white border-2 rounded-lg px-8 pt-4 mx-8  border-gray-950 mb-4"
        >
          <form onSubmit={handleCommentSubmit}>
            <div class="mb-4 top-10 flex">
              <svg
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 45.532 45.532"
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
              <p class="ml-2 font-semibold">{user.firstname}</p>
            </div>
            <div class="top-28 ">
              {/* <input type="text" name="content" onChange={handleChange} className="border-2 border-black  w-[60pxpx] px-2  rounded-full"  required /> */}
              <textarea
                type="text"
                ref={commentRef}
                name="content"
                onChange={(e) => {
                  handleChange(e);
                  autoResize(commentRef);
                }}
                placeholder="whats your thoughts?"
                className="focus:outline-none resize-none laptop-l:w-[200px]  border-gray-300 transition duration-200"
              />
              <div class="flex">
                <p className="mr-36 font-bold">B</p>
                <button type="submit" className="font-bold">
                  Response
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* All Comments */}
        <div className="border-t-2 border-zinc-950">
          <div class="mx-6 my-4">
            <div ref={containerRef}>
              {commentdata && commentdata.length > 0 ? (
                commentdata
                  .slice(-5)
                  .reverse()
                  .map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mt-4">
                      <div class="flex">
                      <svg
                          version="1.1"
                          id="Capa_1"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0 0 45.532 45.532"
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
                        <p className="pl-2 mb-4">{item.createdBy.firstname}</p>
                      </div>
                        <div>
                          {/* Menus */}
                          <button className='fixed left-72' onClick={()=>toggleCommentMenus(item)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M4.385 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41m5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59s-.58.86-.58 1.41m5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59s1.03-.2 1.42-.59.58-.86.58-1.41-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59s-.58.86-.58 1.41"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            {/* <div className='fixed top-72 right-8'> */}
                            {activeCommentId === item._id && <SideBarCommentMenu commentInfo={item}/>}
                            {/* </div> */}
                          </button>
                        </div>
                      </div>

                      {/* Comment Submission */}
                      <div className="border-b-2 border-slate-950">
                        {/* <p className="mb-6 pb-3 ">{item.content}</p> */}
                        <textarea
                          ref={commentMessageRef}
                          value={item.content}
                          onChange={(e) => {
                            item.content = e.target.value; // Update content
                            autoMessageResize(); // Adjust height
                          }}
                          className="focus:outline-none resize-none laptop-l:w-[300px] border-gray-300 transition duration-200 overflow-hidden"
                        />
                      </div>
                    </div>
                  ))
              ) : (
                <p>No comments available</p> // Optional fallback when no data is present
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className={`${messageIsOpen?"opacity-55 translate-x-6 bg-slate-500":""}`}></div> */}
    </div>
  );
};

export default SideBarMessagebox;


{/* <div className="mt-3 l:px-5 s:px-3">
<textarea
  ref={titleRef}
  className="laptop-l:w-[700px] laptop:w-[700px] l:w-[385px] s:w-[290px] tablet:w-[700px] overflow-hidden text-4xl s:text-3xl font-semibold text-gray-900 placeholder-gray-400 focus:outline-none resize-none   border-gray-300 transition duration-200"
  name="title"
  placeholder="Title"
  onChange={(e) => {
    handleChange(e);
    autoResize(titleRef);
  }}
  required
/>
</div> */}

