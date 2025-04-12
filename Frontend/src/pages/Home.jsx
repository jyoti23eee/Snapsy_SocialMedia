import React, { useState } from "react";
import ProfileSide from "../Components/ProfileSide";
import PostSide from "../Components/PostSide";
import RightSide from "../Components/RightSide";

const Home = () => {
  // ✅ Move posts state to Home.jsx so it can be shared
  const [posts, setPosts] = useState([]);

  return (
    <div className="relative w-full h-screen flex px-4">
      {/* Main Content */}
      <div className="relative flex w-full">
        {/* Left Section - Profile */}
        <div className="w-1/3 p-4">
          <ProfileSide posts={posts} setPosts={setPosts} /> {/* ✅ Pass state */}
        </div>

        {/* Middle Section - PostSide */}
        <div className="w-1/3 p-4">
          <PostSide posts={posts} /> {/* ✅ Pass posts to PostSide */}
        </div>

        {/* Right Section - Suggestions/Trends */}
        <div className="w-1/3 p-4">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Home;


