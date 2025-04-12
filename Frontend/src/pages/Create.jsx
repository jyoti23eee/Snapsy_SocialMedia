/*
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiCamera,
  FiVideo,
  FiImage,
  FiWifi,
  FiX,
  FiChevronDown
} from 'react-icons/fi';

function Create({ onClose, onPost }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [showReel, setShowReel] = useState(false);
  const [reelHeight, setReelHeight] = useState('0px');
  const [showLivePanel, setShowLivePanel] = useState(false);

  const handleOptionClick = (id) => {
    if (id === 'post') {
      fileInputRef.current.click();
    } else if (id === 'reel') {
      const isOpening = !showReel;
      setShowReel(isOpening);
      setReelHeight(isOpening ? '500px' : '0px');
    } else if (id === 'live') {
      navigate('/LivePage'); // Navigate to live streaming page
      // Alternatively, you could open a panel similar to the Reel panel:
      // setShowLivePanel(true);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      const type = selectedFile.type.startsWith('video') ? 'video' : 'image';
      setPreview({ url: fileURL, type });
      setFile(selectedFile);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setFile(null);
  };

  const handlePostNow = () => {
    if (preview) {
      onPost(preview);
      clearPreview();
      onClose();
    }
  };

  const options = [
    { id: 'post', label: 'Post', icon: <FiImage className="text-pink-500 text-3xl" /> },
    { id: 'story', label: 'Story', icon: <FiCamera className="text-blue-500 text-3xl" /> },
    { id: 'reel', label: 'Reel', icon: <FiVideo className="text-red-500 text-3xl" /> },
    { id: 'live', label: 'Live', icon: <FiWifi className="text-green-500 text-3xl" /> },
  ];

  return (
    <div className="relative w-[320px] h-full bg-sky-800 shadow-xl rounded-l-xl p-4 overflow-y-auto">
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*"
        onChange={handleFileChange}
      />

      
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-200 hover:text-white transition">
        <FiX size={22} />
      </button>

      
      <h2 className="text-xl font-bold text-white text-center mb-6 mt-8">Create</h2>

      
      <div className="grid grid-cols-2 gap-4 px-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all"
          >
            {option.icon}
            <span className="mt-2 text-sm font-medium text-gray-700">{option.label}</span>
          </div>
        ))}
      </div>

      
      {preview && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Preview</h3>
            <button onClick={clearPreview} className="text-sm text-red-500 hover:underline">Remove</button>
          </div>
          {preview.type === 'image' ? (
            <img src={preview.url} alt="preview" className="w-full h-40 object-cover rounded-lg" />
          ) : (
            <video src={preview.url} controls className="w-full h-40 object-cover rounded-lg" />
          )}

          <button
            onClick={handlePostNow}
            disabled={!file}
            className={`w-full mt-4 py-2 rounded-lg transition 
              ${file ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            Post Now
          </button>
        </div>
      )}

      
      {showReel && (
        <>
          <div 
            className="absolute inset-0 bg-black bg-opacity-40 z-20"
            onClick={() => {
              setShowReel(false);
              setReelHeight('0px');
            }}
          />
          <div
            className={`absolute left-0 right-0 bg-white rounded-t-xl shadow-lg transition-all duration-300 z-30`}
            style={{
              bottom: '0',
              height: reelHeight
            }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">Create Reel</h3>
              <button 
                onClick={() => {
                  setShowReel(false);
                  setReelHeight('0px');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiChevronDown size={20} />
              </button>
            </div>
            <div className="h-[calc(100%-50px)] overflow-y-auto">
              <Reel onPost={onPost} onClose={() => {
                setShowReel(false);
                setReelHeight('0px');
              }} />
            </div>
          </div>
        </>
      )}

      
      {showLivePanel && (
        <div className="absolute inset-0 bg-white z-30 p-4">
          <button 
            onClick={() => setShowLivePanel(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FiX size={22} />
          </button>
          <h3 className="text-xl font-bold mb-4">Go Live</h3>
          
          <div className="text-center py-8">
            <p className="text-lg mb-4">Live streaming functionality would be implemented here</p>
            <button 
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
              onClick={() => {
                // Start live stream
                navigate('/LivePage');
              }}
            >
              Start Live Stream
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Create;*/

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiCamera,
  FiVideo,
  FiImage,
  FiWifi,
  FiX,
  FiChevronDown
} from 'react-icons/fi';

function Create({ onClose, onPost }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [showReel, setShowReel] = useState(false);
  const [reelHeight, setReelHeight] = useState('0px');
  const [showLivePanel, setShowLivePanel] = useState(false);
  const [liveHeight, setLiveHeight] = useState('0px');

  const handleOptionClick = (id) => {
    if (id === 'post') {
      fileInputRef.current.click();
    } else if (id === 'reel') {
      const isOpening = !showReel;
      setShowReel(isOpening);
      setReelHeight(isOpening ? '500px' : '0px');
      // Close live panel if opening reel
      if (isOpening) {
        setShowLivePanel(false);
        setLiveHeight('0px');
      }
    } else if (id === 'live') {
      const isOpening = !showLivePanel;
      setShowLivePanel(isOpening);
      setLiveHeight(isOpening ? '500px' : '0px');
      // Close reel panel if opening live
      if (isOpening) {
        setShowReel(false);
        setReelHeight('0px');
      }
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      const type = selectedFile.type.startsWith('video') ? 'video' : 'image';
      setPreview({ url: fileURL, type });
      setFile(selectedFile);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setFile(null);
  };

  const handlePostNow = () => {
    if (preview) {
      onPost(preview);
      clearPreview();
      onClose();
    }
  };

  const options = [
    { id: 'post', label: 'Post', icon: <FiImage className="text-pink-500 text-3xl" /> },
    { id: 'story', label: 'Story', icon: <FiCamera className="text-blue-500 text-3xl" /> },
    { id: 'reel', label: 'Reel', icon: <FiVideo className="text-red-500 text-3xl" /> },
    { id: 'live', label: 'Live', icon: <FiWifi className="text-green-500 text-3xl" /> },
  ];

  return (
    <div className="relative w-[320px] h-full bg-sky-800 shadow-xl rounded-l-xl overflow-hidden">
      {/* Main Content */}
      <div className={`p-4 h-full overflow-y-auto ${(showReel || showLivePanel) ? 'opacity-50' : ''}`}>
        {/* File input for posts */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />

        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-200 hover:text-white transition">
          <FiX size={22} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-white text-center mb-6 mt-8">Create</h2>

        {/* Option Buttons */}
        <div className="grid grid-cols-2 gap-4 px-4">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all"
            >
              {option.icon}
              <span className="mt-2 text-sm font-medium text-gray-700">{option.label}</span>
            </div>
          ))}
        </div>

        {/* Preview Section */}
        {preview && (
          <div className="mt-6 bg-white p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Preview</h3>
              <button onClick={clearPreview} className="text-sm text-red-500 hover:underline">Remove</button>
            </div>
            {preview.type === 'image' ? (
              <img src={preview.url} alt="preview" className="w-full h-40 object-cover rounded-lg" />
            ) : (
              <video src={preview.url} controls className="w-full h-40 object-cover rounded-lg" />
            )}

            <button
              onClick={handlePostNow}
              disabled={!file}
              className={`w-full mt-4 py-2 rounded-lg transition 
                ${file ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              `}
            >
              Post Now
            </button>
          </div>
        )}
      </div>

      {/* Reel Overlay Panel */}
      {showReel && (
        <div
          className={`absolute left-0 right-0 bg-white rounded-t-xl shadow-lg transition-all duration-300 z-10`}
          style={{
            bottom: '0',
            height: reelHeight
          }}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Create Reel</h3>
            <button 
              onClick={() => {
                setShowReel(false);
                setReelHeight('0px');
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiChevronDown size={20} />
            </button>
          </div>
          <div className="h-[calc(100%-50px)] overflow-y-auto bg-sky-800">
            <Reel 
              onPost={onPost} 
              onClose={() => {
                setShowReel(false);
                setReelHeight('0px');
              }} 
            />
          </div>
        </div>
      )}

      {/* Live Overlay Panel */}
      {showLivePanel && (
        <div
          className={`absolute left-0 right-0 bg-white rounded-t-xl shadow-lg transition-all duration-300 z-10`}
          style={{
            bottom: '0',
            height: liveHeight
          }}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Go Live</h3>
            <button 
              onClick={() => {
                setShowLivePanel(false);
                setLiveHeight('0px');
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiChevronDown size={20} />
            </button>
          </div>
          <div className="h-[calc(100%-50px)] overflow-y-auto bg-sky-800">
            <LivePanel 
              onClose={() => {
                setShowLivePanel(false);
                setLiveHeight('0px');
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Reel Component
const Reel = ({ onPost, onClose }) => {
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
      onPost(newPost);
      setVideoPreview(null);
      onClose();
    }
  };

  const handleDelete = () => {
    setVideoPreview(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Add a Reel 🎥</h1>

      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex gap-4 mb-8">
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
        <div className="w-full">
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

// LivePanel Component
const LivePanel = ({ onClose }) => {
  const navigate = useNavigate();

  const handleStartLive = () => {
    navigate('/LivePage');
    onClose();
  };

  return (
    <div className="p-4 text-white">
      <h3 className="text-lg font-semibold mb-4">Start a Live Stream</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Stream Title</label>
        <input
          type="text"
          placeholder="What are you streaming about?"
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Privacy</label>
        <select className="w-full p-2 border border-gray-300 rounded-lg text-gray-800">
          <option>Public</option>
          <option>Friends</option>
          <option>Only Me</option>
        </select>
      </div>
      
      <button
        onClick={handleStartLive}
        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Start Live Stream
      </button>
      
      <div className="mt-4 text-center text-sm text-gray-300">
        <p>By going live, you agree to our community guidelines</p>
      </div>
    </div>
  );
};

export default Create;