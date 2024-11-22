import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";


const UpdateBlog = () => {
  const { id } = useParams();
  const adminId = localStorage.getItem("AdminId");
  const navigate = useNavigate();
  console.log(id);
  const [updateblog, setUpdateBlog] = useState({
    title: "",
    body: "",
  });
  const [updatedblog] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // const[value,setValue]=useState(null)

  const TitleRef = useRef(null);
  const ContentRef = useRef(null);

  const handleChange = (e) => {
    // const {title,body}=[e.target.name]
    setUpdateBlog({ ...updateblog, [e.target.name]: e.target.value });
    console.log(e.target.value);
    console.log(updateblog);
    // setValue(e.target.value)
  };

  const handleSubmit = async (e) => {
    if (adminId) {
      e.preventDefault();
      try {
        const response = await axiosInstance.patch(
          `/blog/updateBlog/${id}`,
          updateblog
        );
        const { successmessage } = response.data;
        setMessage(successmessage);
        navigate(`/blog/${id}`);
        // window.location.reload()
      } catch (error) {
        setError(error.message);
      }
    } else {
      setMessage("You are Not Created this Blog");
    }
  };

  console.log(updatedblog);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${id}`);
        const { blog } = response.data;
        setUpdateBlog({ ...blog, title: blog.title, body: blog.body });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (TitleRef.current) {
      // Reset height to auto to shrink it back before recalculating
      TitleRef.current.style.height = "auto";

      // Adjust the height of the input based on scrollHeight
      TitleRef.current.style.height = `${TitleRef.current.scrollHeight}px`;
    }
  }, [updateblog.title]);

  useEffect(() => {
    if (ContentRef.current) {
      ContentRef.current.style.height = "auto";

      // Adjust the height of the input based on scrollHeight
      ContentRef.current.style.height = `${ContentRef.current.scrollHeight}px`;
    }
  }, [updateblog.body]);

  if (!updateblog) {
    return <div>Loading Blog...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="flex justify-center overflow-hidden s:px-8 l:px-24">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center tablet:text-4xl l:text-xl ">
             <textarea
                ref={TitleRef}
                value={updateblog.title}
                className="tablet:w-[590px]  l:w-[377px] m:w-[327px]  s:w-[300px]  s:text-2xl flex s:justify-center justify-center font-semibold overflow-hidden focus:outline-none resize-none bg-transparent"
                type="text"
                name="title"
                onChange={handleChange}
                required
              />
          </div>
          <div className="text-5xl s:flex justify-center mb-6">. . . .</div>                
          <div className="flex justify-center tablet:text-4xl tablet:ml-5  text-4xl px-3 l:text-xl l:justify-center s:text-2xl">
              <textarea
                ref={ContentRef}
                value={updateblog.body}
                className="tablet:w-[600px] tablet:h-[104px] l:w-[377px] l:h-[76px] m:w-[327px] m:h-[114px] s:w-[272px] s:h-[114px] font-custom-serif space-x-5 text-2xl overflow-hidden focus:outline-none resize-none  bg-transparent"
                type="text"
                name="body"
                onChange={handleChange}
                required
              />
            <button
              type="submit"
              className="fixed bottom-10 w-32 bg-red-700 p-2 text-xl"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
      {error && <p>{error.message}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateBlog;

