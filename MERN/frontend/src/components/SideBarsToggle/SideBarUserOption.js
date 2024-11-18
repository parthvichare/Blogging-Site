import React from "react";
import Signout from "../SignUpAuthentication/Signout";

const SideBarUserOption = ({ userOption }) => {
  const userId=localStorage.getItem("AdminId")
  return (
    <div>
      {userOption && (
        <div className="fixed top-14 right-8 w-64 h-28  bg-white border-2 border-gray-100">
          <div className="laptop-l:flex s:flex justify-start ml-4 my-2 ">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Profile"
            >
              <circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle>
              <path
                stroke="currentColor"
                stroke-linecap="round"
                d="M3.5 21.5v-4.342C3.5 15.414 7.306 14 12 14s8.5 1.414 8.5 3.158V21.5"
              ></path>
            </svg>
            <a href={`/user/${userId}`}>
            <span class="ml-2 text-xl">Profile</span>
            </a>
          </div>
          <div class="laptop-l:flex justify-start my-3 border-t-2 border-gray-300">
            <Signout />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBarUserOption;
