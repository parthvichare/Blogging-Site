import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const BlogContext = createContext();

// Create a provider component
export const BlogProvider = ({ children }) => {
  const [notifytoggle, setNotifyToggle] = useState(false);

  const [addToggle, setAddToggle] = useState(false);
  const [content, setContent] = useState([]);

  //Blogs StateManagement
  const [count, setCount] = useState(0);
  const [menuisopen, setMenuisOpen] = useState(false);
  const[blogs,setBlog]=useState(null)
  const[messageIsOpen,setMessageIsOpen]=useState(false)
  const[user,setUser]=useState(null);


  //Comments StateManagement
  const[commentmenu,setCommentMenu]=useState(false)
  const [commentdata, setCommentdata] = useState(null);
  const [message, setMessage] = useState(null);
  const[activeCommentId, setActiveCommentId]=useState(null)  

  // const [count, setCount] = useState(0);
  const toggleNotify = () => {
    setNotifyToggle(!notifytoggle);
  };

  const toggleAddButton = () => {
    setAddToggle(!addToggle);
  };

  const toggleMenus = () => {
    setMenuisOpen(!menuisopen);
  };

  return (
    <BlogContext.Provider
      value={{
        notifytoggle,
        toggleNotify,
        count,
        setCount,
        toggleAddButton,
        addToggle,
        setAddToggle,
        content,
        setContent,
        toggleMenus,
        menuisopen, 
        setMenuisOpen,
        blogs,
        setBlog,
        messageIsOpen,
        setMessageIsOpen,
        commentmenu,
        setCommentMenu,
        commentdata, 
        setCommentdata,
        message,
        setMessage,
        activeCommentId, 
        setActiveCommentId,
        user,
        setUser
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
