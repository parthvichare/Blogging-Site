import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { BlogContext } from '../BlogContext';

const UserInfo = ({socket}) => {
    const{id}=useParams();
    const{user,setUser}=useContext(BlogContext)
    const[blogNotify,setBlogNotify]=useState(null)
    const[userBlogs,setUserBlogs]=useState(null)

    useEffect(()=>{
      const fetchUser= async()=>{
        try{
          const response = await axiosInstance.get(`/user/${id}`);
          setUser(response.data.users);
        }catch(error){
          console.log("Error fetching user:", error)
        }
      }
      fetchUser()
    },[id])


    // Getting the User Id from local
    const userId= localStorage.getItem("AdminId")

     const BACKEND_URL= process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'

    useEffect(()=>{
      const fetchBlogNotify=()=>{
        if(userId){
            if(socket && socket.current){
                socket.current.on("NewBlogNotify", (notifyData) => {
                    if (notifyData) {
                        setBlogNotify(notifyData);
                        // Save notifications to localStorage
                        localStorage.setItem("blogNotify", JSON.stringify(notifyData));
                        console.log("Received Notification:", notifyData);
                    }
                });
            }
        }
    }
    fetchBlogNotify()
     },[id])

     useEffect(()=>{
      const fetchBlog=async()=>{
        try{
          const response = await axiosInstance.get("/blog/api/blogs")
          setUserBlogs(response.data.blogs)
        }catch(error){
          console.log(error.message)
        }
      }
      fetchBlog()
     },[id])

     if(!userBlogs){
      return <p>Loading</p>
     }

     const filterUserBlog=userBlogs.filter((item)=>item.createdBy._id === userId)
     console.log("Filterd",filterUserBlog)

    if (!user) return <p>Loading user data...</p>;

  return (
    <div className=' laptop-l:justify-center'>
       <div class="laptop-l:flex laptop-l:justify-start laptop-l:ml-96 laptop:ml-56 tablet:ml-28  l:ml-4 s:ml-6 laptop-l:pl-10 mt-4 ">
           <p class="text-4xl"> {user.firstname}</p>
        </div>
        <div className='border-b border-zinc-950 mt-4 laptop-l:justify-center'></div>
        {/* <div>
          <AllBlogs />
        </div> */}
        <div class="laptop-l:w-[728px] laptop-l:px-80 tablet:w-[600px] tablet:pl-0 laptop:w-[624px] laptop-l:justify-center mt-16 l:px-5 s:px-3 ">
          {filterUserBlog.map((item)=>(
                          <a
                          class="laptop-l:w-[680px] laptop:w-[680px] tablet:w-[680px] tablet:mx-24 laptop-l:flex laptop:flex tablet:flex l:flex s:flex mb-20 border-b-2 border-slate-100"
                          href={`/blog/${item._id}`}
                        >
                          <div>
                            <div className='laptop-l:flex laptop:flex tablet:flex l:flex s:flex'>
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
                              {/* <p class="laptop-l:w-[464px] ml-4 s:ml-1 s:w-[206px] s:pl-2 s:font-semibold">Blog Created by {item.createdBy.firstname} </p> */}
                            </div>
                            <h2 
                            className="laptop-l:w-[464px] laptop:w-[450px] tablet:w-[430px] tablet:text-3xl laptop-l:text-3xl laptop:text-3xl l:w-[270px] l:text-base l:font-bold mb-2 s:w-[168px] s:font-bold">
                              {item.title}
                            </h2>
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
                              src={`${BACKEND_URL}${item.blogImages}`}
                              className="laptop-l:w-[190px] laptop:w-[180px] tablet:w-[190px] tablet:h-28 laptop:h-24 laptop-l:h-28 l:w-[100px] l:h-20 mb-8 s:w-[230px] s:h-16 "
                            />
                          </div>
                </a>
          ))}
        </div>
    </div>
  )
}

export default UserInfo
