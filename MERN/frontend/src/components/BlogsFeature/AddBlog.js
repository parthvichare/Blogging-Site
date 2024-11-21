import React, { useState, useEffect, useContext, useRef } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { BlogContext } from "../BlogContext";

import io from "socket.io-client";
import AddButton from "./AddButton";

const AddBlog = ({ socket }) => {
  const [blogs, setBlog] = useState({
    title: "",
    body: "",
  });
  const { content, setContent } = useContext(BlogContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const titleRef = useRef(null);
  const bodyRef = useRef(null);


  const navigate = useNavigate(); // Initialize navigate

  console.log("Image", content);


  const handleChange = (e) => {
    setBlog({ ...blogs, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve userId and token from localStorage
    const userId = localStorage.getItem("AdminId");
    const token = localStorage.getItem("token");

    // Create a new blog object with createdBy included
    const blogData = {
      ...blogs,
      createdBy: userId, // Add createdBy field
    };

    // Prepare image file (convert to base64 before sending)
    const imageFile = document.querySelector('input[type="file"]').files[0]; // Assuming you have an input[type="file"]

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result.split(",")[1]; // Get base64 string (remove data URL part)

      // Send the blog data and base64 image to the server through socket
      if (userId && token) {
        socket.current.emit("AddBlog", blogData, base64Image);

        // Listen for the response after the blog is created
        socket.current.on("Userdetails", (blogOwner) => {
          if (blogOwner) {
            try {
              const { blog } = blogOwner;
              if (blog && blog._id) {
                navigate(`/blog/${blog._id}`);
              }
            } catch (error) {
              setError(error);
            }
          } else {
            setError("User details could not be retrieved.");
          }
        });
      } else {
        setMessage(
          "You're not signed in. Please log in to add a new blog post!"
        );
      }
    };

    // Read the image file as a base64 string
    reader.readAsDataURL(imageFile);
  };

  const autoResize = (ref) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !bodyRef.current.value) {
      e.preventDefault();
      // Remove the last item if the textarea is empty and Backspace is pressed
      setContent((prev) => prev.slice(0, -1));
    } else if (e.key === "Enter") {
      const currentText = bodyRef.current.value;
      const newText = `${currentText}.\n`;

      bodyRef.current.value = newText;
      handleChange({ target: { name: "body", value: newText } });

      autoResize(bodyRef);
    }
  };

  return (
    <div>
      <div className="h-full flex justify-center items-start laptop-l:justify-center laptop:justify-center laptop:mx-8 border-none overflow-y-hidden">
        <form onSubmit={handleSubmit} className="overflow-hidden">
          {/* Title Input Section */}
          <div className="mt-3 l:px-5 s:px-3">
            <textarea
              ref={titleRef}
              className="laptop-l:w-[700px] laptop:w-[700px] l:w-[385px] s:w-[290px] tablet:w-[700px] overflow-hidden text-4xl s:text-3xl font-semibold text-gray-900 placeholder-gray-400 focus:outline-none resize-none   border-gray-300 transition duration-200 bg-transparent"
              name="title"
              placeholder="Title"
              onChange={(e) => {
                handleChange(e);
                autoResize(titleRef);
              }}
              required
            />
          </div>

          <div class="flex justify-center font-extrabold text-5xl s:text-3xl laptop:text-2xl ">
            . . .
          </div>

          {/* Body Input Section */}
          <div>
            <AddButton />
            <div>
              <div class="flex-row">
                <div class="l:px-5 laptop-l:justify-center">
                  {content.map((block, index) =>
                    block.type !== "text" ? (
                      // <p key={index} className="text-lg">{block.value}</p>
                      <div className="px-8 pb-5 ">
                        <img
                          key={index}
                          src={block.value}
                          alt="Uploaded"
                          className="max-w-full h-auto mt-4 m:w-[375px] s:w-[280px] laptop-l:w-[611px]"
                        />
                      </div>
                    ) : (
                      // <img key={index} src={block.value} alt="Uploaded" className="max-w-full h-auto mt-4" />
                      // <h1 key={index} className="text-lg">{block.value}</h1>
                      <p>{block.body}</p>
                    )
                  )}
                  <div class="mt-2"></div>
                  <textarea
                    ref={bodyRef}
                    onKeyDown={handleKeyDown}
                    className="laptop-l:w-[700px] laptop:w-[700px] tablet:w-[700px] l:w-[385px] m:w-[335px] s:w-[280px] l:text-xl laptop-l:text-4xl laptop:text-3xl s:text-2xl s:pl-3 text-gray-800 placeholder-gray-400 focus:outline-none resize-none l:flex justify-end border-gray-300 transition duration-200  bg-transparent"
                    name="body"
                    placeholder="Tell your story..."
                    onChange={(e) => {
                      handleChange(e);
                      autoResize(bodyRef);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className=" px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Blog
            </button>
          </div>
        </form>
        {message && (
          <p class="fixed laptop-l:justify-center text-2xl border-2 border-stone-800 top-2">
            {message}
          </p>
        )}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddBlog;
