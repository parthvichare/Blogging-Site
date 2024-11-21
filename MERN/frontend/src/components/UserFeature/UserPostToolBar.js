import React, { useState, useContext } from "react";
import SideBarMenus from "../SideBarsToggle/SideBarMenus";
import SideBarMessagebox from "../SideBarsToggle/SideBarMessagebox";
import { BlogContext } from "../BlogContext";

const UserPostToolBar = ({blogs}) => {
  const [menuisopen, setMenuisOpen] = useState(false);
  const toggleMenus = () => {
    setMenuisOpen(!menuisopen);
  };

  const { messageIsOpen, setMessageIsOpen } = useContext(BlogContext);

  const toggleMessagebox = (event) => {
    event.stopPropagation();
    setMessageIsOpen(!messageIsOpen);
  };
  console.log(messageIsOpen);

  console.log(menuisopen);
  return (
    <div>
      <div class="my-6 laptop-l:flex laptop:ml-24 laptop:flex laptop-l:ml-24 pl-4 tablet:flex tablet:ml-10  l:flex l:ml-4 s:flex ">
        <svg
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          width="45.532px"
          height="45.532px"
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
        <div>
          <p class="pl-4 font-semibold ">{blogs.createdBy.firstname}</p>
          <p className="pl-4">Mar 31, 2024</p>
        </div>
      </div>
      <div class="laptop:ml-20 tablet:ml-6">
        <div className=" pb-2 pt-3 laptop-l:w-[680px] laptop-w-[680px] tablet:w-[680px] border-b-2 border-gray-200"></div>
        <div class="flex item-between justify-between  pb-2 pt-2 laptop-l:w-[680px] laptop:w-[680px] tablet:w-[680px] l:w-[425px] border-b-2 border-gray-200">
          <div class="laptop-l:flex laptop:flex tablet:flex l:flex l:ml-4 s:flex">
            {/* LikesIcon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="blue"
              className="w-8 mr-3"
            >
              <path d="M2 21h4V9H2v12zm20-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1 1 0 0 0-.29-.7l-1-1L9 8.5V19h9.4c.93 0 1.72-.64 1.93-1.54l1.39-6.19c.05-.23.08-.46.08-.69v-1z"></path>
            </svg>

            {/* Message Icon */}
            <button className="cursor-pointer flex" onClick={toggleMessagebox}>
              {/* <div > */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="xb bg-transparent text-stone-800" 
              >
                <path d="M18.006 16.803c1.533-1.456 2.234-3.325 2.234-5.321C20.24 7.357 16.709 4 12.191 4S4 7.357 4 11.482c0 4.126 3.674 7.482 8.191 7.482.817 0 1.622-.111 2.393-.327.231.2.48.391.744.559 1.06.693 2.203 1.044 3.399 1.044.224-.008.4-.112.486-.287a.49.49 0 0 0-.042-.518c-.495-.67-.845-1.364-1.04-2.057a4 4 0 0 1-.125-.598zm-3.122 1.055-.067-.223-.315.096a8 8 0 0 1-2.311.338c-4.023 0-7.292-2.955-7.292-6.587 0-3.633 3.269-6.588 7.292-6.588 4.014 0 7.112 2.958 7.112 6.593 0 1.794-.608 3.469-2.027 4.72l-.195.168v.255c0 .056 0 .151.016.295.025.231.081.478.154.733.154.558.398 1.117.722 1.659a5.3 5.3 0 0 1-2.165-.845c-.276-.176-.714-.383-.941-.59z"></path>
              </svg>
              <p className="pl-2">4</p>
              {/* </div> */}
            </button>
          </div>
          <div class="l:mr-4 s:mr-2">
            {/* Toggle Menu for Option of Deleting & Editing the Blog */}
            <button onClick={toggleMenus}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="xb bg-transparent text-stone-600" 
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M4.385 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41m5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59s-.58.86-.58 1.41m5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59s1.03-.2 1.42-.59.58-.86.58-1.41-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59s-.58.86-.58 1.41"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* SideBar Of Menus of delete and Editing blog */}
      <div class="flex justify-end">
        <SideBarMenus menuisopen={menuisopen} />
      </div>

      {/* Message Icon to toggle the MessageBox data */}
      <div>
        <SideBarMessagebox
          messageIsOpen={messageIsOpen}
          toggleMessagebox={toggleMessagebox}
        />
      </div>
    </div>
  );
};

export default UserPostToolBar;
