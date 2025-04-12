import React, { useState } from "react";
import {
  FaSearch, FaPlus, FaUserPlus, FaHeart, FaComment,
  FaBars, FaEllipsisV, FaTrash, FaEdit, FaPlusSquare
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Create from "../pages/Create";

const ProfileSide = ({ posts, setPosts }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [showOptions, setShowOptions] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // 🌟 Modal state

  const userName = "Jyoti";
  const navigate = useNavigate();

  const handlePostUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const fileType = file.type.startsWith("video") ? "video" : "image";
      setPosts([...posts, { url: fileURL, type: fileType }]);
    }
  };

  const handlePostFromCreate = (post) => {
    setPosts([...posts, post]);
  };

  const handleDeletePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
    if (selectedPost && posts[index]?.url === selectedPost.url) {
      setSelectedPost(null); // close modal if deleted
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col items-center p-6 bg-sky-900 shadow-xl rounded-[5%]">
      {/* Header */}
      <div className="flex items-center justify-between w-full my-5 mt-4 mx-6">
        <h1 className="text-white font-bold text-4xl tracking-wide">Snapsy</h1>
        <div className="flex gap-4">
          <FaHeart className="text-red-600 text-xl cursor-pointer hover:scale-110 transition-transform" />
          <FaComment className="text-gray-200 text-xl cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate("/Chats")} />
          <FaPlusSquare
            className="text-gray-200 text-xl cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowCreate(!showCreate)}
          />
          <FaBars className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate("/settingPage")} />
        </div>
      </div>

      {/* Search */}
      <div className="w-full flex items-center border border-gray-300 rounded-lg p-2 bg-gray-100 mb-6 shadow-lg">
        <input type="text" className="w-full outline-none px-2 text-gray-700 bg-transparent" placeholder="Search..." />
        <FaSearch className="text-gray-500 cursor-pointer" />
      </div>

      {/* Profile Info */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-2xl font-semibold text-white">{userName}</h2>
        <label htmlFor="postUpload" className="cursor-pointer text-white text-xl">
          <FaPlus />
        </label>
        <input type="file" id="postUpload" className="hidden" accept="image/*,video/*" onChange={handlePostUpload} />
      </div>

      {/* Profile Image and Stats */}
      <div className="flex w-full items-center justify-between mb-3">
        <label htmlFor="profileImage" className="cursor-pointer flex flex-col items-center">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-blue-500 object-cover" />
          ) : (
            <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              Upload
            </div>
          )}
        </label>
        <input type="file" id="profileImage" className="hidden" accept="image/*" onChange={(e) => setProfileImage(URL.createObjectURL(e.target.files[0]))} />

        <div className="flex gap-3 md:gap-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">{posts.length}</h3>
            <p className="text-white">Posts</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">{followers}</h3>
            <button className="text-white px-2 py-1 rounded-lg mt-1" onClick={() => setFollowers(followers + 1)}>Followers</button>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">{following}</h3>
            <button className="text-white px-2 py-1 rounded-lg mt-1" onClick={() => setFollowing(following + 1)}>Following</button>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="w-full bg-blue-100 p-4 rounded-xl shadow-md mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Profile Details</h3>
        <p className="text-gray-600 mt-2">Some user information goes here...</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => navigate('/editProfile')}
          className="flex items-center justify-center w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          <FaEdit className="mr-2" />
          Edit Profile
        </button>
        <button className="bg-gray-200 text-black px-4 py-2 rounded-lg shadow hover:bg-gray-300">Share Profile</button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-gray-500">
          <FaUserPlus />
        </button>
      </div>

      {/* Create Component */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex">
      {/* Transparent overlay to close */}
        <div
          className="flex-1 bg-black/30"
          onClick={() => setShowCreate(false)}
        ></div>

        {/* Slide-in Create panel */}
        <div className="w-[400px] max-w-full h-full bg-white shadow-lg transition-transform transform translate-x-0 overflow-y-auto">
          <Create
           onClose={() => setShowCreate(false)}
           onPost={(newPost) => setPosts([...posts, newPost])}
          />
        </div>
      </div>
      )}


      {/* Post Grid */}
      <div className="grid grid-cols-3 gap-4 w-full max-h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 p-2">
        {posts.map((post, index) => (
          <div
            key={index}
            className="relative w-full h-40 rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <FaEllipsisV
              className="absolute top-1 right-3 text-gray-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowOptions(showOptions === index ? null : index);
              }}
            />
            {showOptions === index && (
              <div className="absolute top-6 right-3 bg-white shadow-md rounded p-2 z-10">
                <button
                  className="text-red-500 text-sm flex items-center gap-1 px-2 py-1"
                  onClick={() => handleDeletePost(index)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
            {post.type === "image" ? (
              <img src={post.url} alt={`Post ${index}`} className="w-full h-full object-cover" />
            ) : (
              <video src={post.url} controls className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Full Screen Preview Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 max-w-[90%] max-h-[90%] relative">
            <button
              className="absolute top-2 right-2 text-black text-xl"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>
            {selectedPost.type === "image" ? (
              <img src={selectedPost.url} alt="Preview" className="max-w-full max-h-[80vh] object-contain" />
            ) : (
              <video src={selectedPost.url} controls className="max-w-full max-h-[80vh] object-contain" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSide;

