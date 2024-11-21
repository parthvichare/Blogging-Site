import React, { useState, useContext } from "react";
import AddedBlogNotify from "./AddedBlogNotify";

import { BlogContext } from "./BlogContext";
import SideBarUserOption from "./SideBarsToggle/SideBarUserOption";

const Navbar = ({ socket }) => {
  const userId = localStorage.getItem("AdminId");
  const token = localStorage.getItem("token");
  const { count } = useContext(BlogContext);
  const [userOption, setUserOption] = useState(false);

  const toggleUserOption = () => {
    setUserOption(!userOption);
  };

  console.log(userOption);

  if (!token) {
    return (
      <section class="my-3 laptop-l:px-10 border-b-2">
        <div class="flex items-center justify-between mb-4">
          {/* SignOut Navbar */}
          <ul class="">
            <a href="/">
              <li class="text-3xl font-thin font-custom-serif tablet:pl-5  m:text-2xl s:text-2xl">
                Medium
              </li>
            </a>
          </ul>

          <div class="flex  l:pr-6 l:space-x-4 m:px-4 laptop:pr-16 justify-end laptop-l:space-x-9  s:space-x-6 s:pr-4">
            <a href="/user/signup">
              <li class="list-none text-stone-700 hover:text-black s:text-xx laptop-l:text-xl laptop:text-lg">
                SignUp
              </li>
            </a>

            <a href="/user/signIn">
              <li class="list-none text-stone-700 hover:text-black s:text-xx laptop-l:text-xl laptop:text-lg">
                SignIn
              </li>
            </a>

            <a href="/">
              <li class="list-none text-stone-700 hover:text-black s:text-xx laptop-l:text-xl laptop:text-lg">
                All Blogs
              </li>
            </a>
          </div>
        </div>
      </section>
    );
  } else if (token && userId) {
    return (
      <div>
        <section class="laptop-l:w-full laptop:w-full tablet:w-[768px] mt-3 laptop-l:px-4  border-b-4 l:w-full">
          <div class="laptop-l:flex laptop:flex l:flex justify-between s:flex tablet:flex mb-2 ">
            {/* Logo */}
            <ul>
              <a href="/">
                <li class="text-3xl font-thin font-custom-serif l:pl-8 s:pl-2 mt-1">
                  Medium
                </li>
              </a>
            </ul>

            {/* Menus */}
            <div class="l:w-full s:w-full l:pr-2">
              <ul class="laptop-l:flex laptop:flex tablet:flex justify-end inline-block space-x-8 s:space-x-8 s:flex m:space-x-8 tablet:mr-10 m:mr-4">
                <a href="/blog/addblog">
                  <div class="laptop-l:flex laptop:flex tablet:flex tablet:w-8 tablet:h-8 s:w-5  block   text-stone-600 hover:text-black">
                    {/* Writing Blog */ }
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-label="Write"
                      className="mt-1 bg-transparent"
                    >
                      <path
                        fill="currentColor"
                        d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
                      ></path>
                      <path
                        stroke="currentColor"
                        d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"
                      ></path>
                    </svg>
                  </div>
                </a>

                {/* Notification Navbar */}
                <div class="l:mt-0 s:mb-2  ">
                  <AddedBlogNotify socket={socket} count={count} />
                </div>

                {/* Profile Navbar */}
                <button onClick={toggleUserOption} className="s:mb-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="text-gray-700 hover:text-blue-500 border-2 border-black rounded-full w-8 h-8"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M12 14c-5.33 0-8 3-8 4.5V20h16v-1.5c0-1.5-2.67-4.5-8-4.5z" />
                  </svg>
                </button>
              </ul>
            </div>
          </div>
        </section>
        <div>
          <SideBarUserOption userOption={userOption} />
        </div>
      </div>
    );
  }
};

export default Navbar;

// <div class="laptop-l:w-screen laptop-l:flex  s:w-64 justify-center">
// <ul>
//   <a>
//     <li class="text-2xl font-bold">Medium</li>
//   </a>
//   <div>

//   </div>
// <a href="/blog/addblog">
//   <li>AddBlog</li>
// </a>
// <a href={`/user/${userId}`}>
//  <div>
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     fill="currentColor"
//     class="text-gray-700 hover:text-blue-500 border-2 border-black rounded-full w-8 h-8"
//     viewBox="0 0 24 24"
//   >
//     <circle cx="12" cy="8" r="4" />
//     <path d="M12 14c-5.33 0-8 3-8 4.5V20h16v-1.5c0-1.5-2.67-4.5-8-4.5z" />
//   </svg>
// </div>
// </a>
// <a href="/">
//   <li>All Blogs</li>
// </a>
//   <Logout />
// </ul>
// </div>
