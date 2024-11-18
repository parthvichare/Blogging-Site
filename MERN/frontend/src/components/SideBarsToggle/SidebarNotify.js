import React,{useState,useEffect} from 'react'

const SidebarNotify = ({ notifytoggle, toggleNotify, socket }) => {
  const[blogNotify,setBlogNotify]=useState(null)
  const[notify,setNotify]=useState(null)


  useEffect(()=>{
    if(socket && socket.current){
      if(notifytoggle===true){
        socket.current.on("NewBlogNotify",(notifyData)=>{
          if(notifyData){
            setBlogNotify(notifyData)
          }else{
          }
        })
      }
    }
  },[notifytoggle])

  useEffect(() => {
    if (notifytoggle && !blogNotify) {
      const savedNotification = JSON.parse(localStorage.getItem("blogNotify"));
      if (savedNotification) {
        setBlogNotify(savedNotification);
      }
    }
  }, [notifytoggle]);

  console.log("blog",blogNotify)

  useEffect(()=>{
    if (notifytoggle) {
      // Apply overflow-hidden to body
      document.body.style.overflow = 'hidden';
    } else {
      // Remove overflow-hidden from body
      document.body.style.overflow = '';
    }
  })

  if(!blogNotify){
    return <></>
  }


  return(
    <>
        <div
            className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-x-hidden ${
              notifytoggle ? "translate-x-0 z-20" : "translate-x-full"
            }`}
        >
        <div className='flex border-b-2 border-b-slate-400'>
        <p className='p-4'>Get Notify About New Blogs</p>
        <button className="fixed right-0 text-4xl pr-4 pt-2 hover:text-gray-600" onClick={toggleNotify}>
           X
        </button>
        </div>
        <div>
          {blogNotify.map((newBlog)=>(
            <h1>{newBlog.message}</h1>
          ))}
        </div>
      </div>
    </>
  )
}

export default SidebarNotify
















// import React, { useState, useEffect } from 'react';

// const SidebarNotiy = ({ notifytoggle, toggleNotify, socket }) => {
//   const [blogNotify, setBlogNotify] = useState(null);

//   useEffect(() => {
//     if (socket && socket.current) {
//       socket.current.on("NewBlogNotify", (notifyData) => {
//         if (notifytoggle === true) {
//           if (notifyData) {
//             setBlogNotify(notifyData);
//             // Save notifications to localStorage
//             localStorage.setItem("blogNotify", JSON.stringify(notifyData));
//             console.log("Received Notification:", notifyData);
//           }
//         }
//       });
//     }
//   }, [notifytoggle]);

//   // Load from localStorage if no data is fetched from socket
//   useEffect(() => {
//     if (notifytoggle && !blogNotify) {
//       const savedNotification = JSON.parse(localStorage.getItem("blogNotify"));
//       if (savedNotification) {
//         setBlogNotify(savedNotification);
//       }
//     }
//   }, [notifytoggle]);

//   return (
//     <>
//       {notifytoggle && (
//         <>
//           <h1>Hello</h1>
//           {Array.isArray(blogNotify) ? (
//             blogNotify.slice(-1).map((item) => (
//               <h1 key={item.id}>{item.message}:{item.blogId}</h1>
//             ))
//           ) : (
//             <div>No notifications</div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default SidebarNotiy;
