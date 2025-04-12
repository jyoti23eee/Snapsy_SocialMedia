import React, { useRef, useEffect, useState } from "react";
import { FaHeart, FaComment, FaShare, FaTrash, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid"; // For unique IDs

function PostSide({ posts, setPosts, userId }) {
  const videoRefs = useRef([]);
  const [muted, setMuted] = useState(true);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    const newLikes = {};
    const newComments = {};
    const newShowComments = {};
    posts.forEach((post) => {
      newLikes[post.id] = newLikes[post.id] || new Set();
      newComments[post.id] = newComments[post.id] || [];
      newShowComments[post.id] = false;
    });
    setLikes(newLikes);
    setComments(newComments);
    setShowComments(newShowComments);
  }, [posts]);

  const handlePostUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("video")) {
      alert("Only video files are allowed!");
      return;
    }
    const fileURL = URL.createObjectURL(file);
    const newPost = { id: uuidv4(), url: fileURL };
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId) => {
    setLikes((prev) => {
      const updatedLikes = new Set(prev[postId]);
      updatedLikes.has(userId) ? updatedLikes.delete(userId) : updatedLikes.add(userId);
      return { ...prev, [postId]: updatedLikes };
    });
  };

  const handleComment = (postId, comment) => {
    if (comment.trim() === "") return;
    setComments((prev) => ({ ...prev, [postId]: [...prev[postId], comment] }));
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleDelete = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  useEffect(() => {
    const handleScroll = () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const rect = video.getBoundingClientRect();
          rect.top >= 0 && rect.bottom <= window.innerHeight ? video.play() : video.pause();
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts]);

  return (
    <div className="relative w-full h-screen overflow-y-scroll snap-mandatory snap-y bg-[radial-gradient(circle,#f3e5ff_30%,#e0f9ff_60%)] shadow-2xl rounded-[5%]">
      <div className="absolute top-4 left-4 z-10">
        <label htmlFor="postUpload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Upload Reel
        </label>
        <input type="file" id="postUpload" className="hidden" accept="video/*" onChange={handlePostUpload} />
      </div>
      <div className="w-full h-full flex flex-col gap-10 py-6">
        {posts.map((post, index) => (
          <div key={post.id} className="relative w-full h-screen flex flex-col items-center justify-center snap-center">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={post.url}
              className="w-full h-[85%] object-cover rounded-lg shadow-md"
              loop
              muted={muted}
              onClick={() => handleLike(post.id)}
            ></video>
            <div className="w-full flex justify-between items-center py-4 px-6 bg-gray-800 rounded-b-lg">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 ${likes[post.id]?.has(userId) ? "text-red-500" : "text-white"}`}
              >
                <FaHeart className="text-2xl" />
                <span className="text-lg">{likes[post.id]?.size}</span>
              </button>
              <button onClick={() => toggleComments(post.id)} className="flex items-center text-white space-x-2">
                <FaComment className="text-2xl" />
                <span className="text-lg">{comments[post.id]?.length}</span>
              </button>
              <button className="flex items-center text-white space-x-2">
                <FaShare className="text-2xl" />
              </button>
              
              <button onClick={toggleMute} className="text-white">
                {muted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
              </button>
            </div>
            {showComments[post.id] && (
              <div className="w-full bg-gray-700 p-4 rounded-lg mt-2">
                <h3 className="text-white font-semibold">Comments</h3>
                <div className="max-h-40 overflow-y-auto">
                  {comments[post.id]?.map((comment, index) => (
                    <p key={index} className="text-gray-300 text-sm mt-1">- {comment}</p>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full p-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none mt-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleComment(post.id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostSide;
