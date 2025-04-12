
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Reel = ({ onPost }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video")) {
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleCameraClick = () => {
    navigate("/VirtualTryOn");
  };

  const handleShare = () => {
    if (videoPreview) {
      const newPost = { url: videoPreview, type: "video" };
      onPost(newPost); // send to parent (used in Profile & Post page)
      setVideoPreview(null); // Clear preview after sharing
      navigate("/profile"); // Optional: go to profile after share
    }
  };

  const handleDelete = () => {
    setVideoPreview(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Add a Reel 🎥</h1>

      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex gap-4">
        <button
          onClick={handleCameraClick}
          className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          📷 Camera
        </button>
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          📁 File
        </button>
      </div>

      {videoPreview && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-xl mb-2">Preview:</h2>
          <video
            src={videoPreview}
            controls
            className="w-full h-auto rounded-lg border border-white"
          />

          <div className="flex gap-4 mt-4 justify-center">
            <button
              onClick={handleShare}
              className="bg-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              ✅ Share Post
            </button>
            <button
              onClick={handleDelete}
              className="bg-gray-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              ❌ Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reel;
