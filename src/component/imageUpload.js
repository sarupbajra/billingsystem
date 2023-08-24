import React, { useRef, useState } from "react";

function UploadAndDisplayImage() {
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();

    return (
      <>
        <div onClick={handleImageClick}>
          <img src="./dining.png" alt="" />
          <input type="file" ref={inputRef} />
        </div>
      </>
    );
  };
}

export default UploadAndDisplayImage;
