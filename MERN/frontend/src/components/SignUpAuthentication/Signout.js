import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';

const Signout = () => {
  const [message, setMessage] = useState();
  // const navigate = useNavigate();
  const userId=localStorage.getItem("AdminId")

  const handleLogOut = async () => {
    try {
    // Clear the token and navigate to login page
    if(userId){
        localStorage.removeItem("token");
        localStorage.removeItem("AdminId")
        localStorage.removeItem("createdBy")
        localStorage.removeItem("blogNotify")
        window.location.href = "/user/signin"; // Redirects to the login page
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setMessage("Logout failed. Please try again.");
    }
  };

  return (
    <div>
      <ul>
        <li>
            <button onClick={handleLogOut} className="ml-4  text-zinc-700 px-4 py-2 rounded hover:text-slate-950 transition duration-300 ease-in-out text-xl ">
              SignOut
            </button>
        </li>
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signout;
