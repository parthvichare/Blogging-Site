import React, { useContext, useState, useRef } from "react";
import { BlogContext } from "../BlogContext";

const SideBarImageUpload = () => {
  const { addToggle,setAddToggle, content,setContent,selectedImage,} = useContext(BlogContext);

  const bodyRef = useRef(null);
  

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setContent((prev) => [
        ...results.map((result) => ({ type: 'image', value: result })),
      ]);
      setAddToggle(false)
    });
  };

  return (
    <div>
      {addToggle ? (
        <span 
          onClick={() => bodyRef.current.click()}  // Trigger file input when clicked
          className="svgIcon svgIcon--addMediaImageInline svgIcon--33px"
        >
          <svg className="svgIcon-use" width="32" height="32" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19 17a2 2 0 100-4 2 2 0 000 4zm0-1a1 1 0 100-2 1 1 0 000 2z"
              fill="#1A8917"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 10h12a2 2 0 012 2v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8a2 2 0 012-2zm0 1a1 1 0 00-1 1v4.293l2.646-2.647a.5.5 0 01.708 0L19.707 21H22a1 1 0 001-1v-8a1 1 0 00-1-1H10zm8.293 10L12 14.707l-3 3V20a1 1 0 001 1h8.293z"
              fill="#1A8917"
            ></path>
            <rect
              x=".5"
              y=".5"
              width="31"
              height="31"
              rx="15.5"
              stroke="#1A8917"
            ></rect>
          </svg>
        </span>
      ) : (
        <></>
      )}

       <input
          type="file"
          ref={bodyRef}
          // value={selectedImage}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={ handleImageUpload}
        />
         {/* <input type="file" style={{ display: 'none' }} onChange={ handleImageUpload} /> */}
    </div>
  );
};

export default SideBarImageUpload;

