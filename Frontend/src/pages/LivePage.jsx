import React, { useEffect, useRef, useState } from 'react';

const filters = [
  { name: 'None', value: 'none' },
  { name: 'Grayscale', value: 'grayscale(100%)' },
  { name: 'Sepia', value: 'sepia(100%)' },
  { name: 'Invert', value: 'invert(100%)' },
  { name: 'Blur', value: 'blur(5px)' },
  { name: 'Brightness', value: 'brightness(150%)' },
  { name: 'Contrast', value: 'contrast(200%)' },
  { name: 'Hue Rotate', value: 'hue-rotate(90deg)' },
  { name: 'Saturate', value: 'saturate(200%)' },
];

function LivePage({ currentUser, followers = [], following = [] }) {
  const videoRef = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera(); // Clean up on unmount
  }, [isLive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setError('Camera access denied or not supported.');
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleGoLive = () => setIsLive(true);
  const handleStopLive = () => setIsLive(false);

  return (
    <div className="w-full h-full bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">🎥 Live Stream with Filters</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!isLive ? (
        <button
          onClick={handleGoLive}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg"
        >
          Go Live
        </button>
      ) : (
        <>
          <video
            ref={videoRef}
            className="w-full max-w-xl rounded-lg shadow-lg mb-4"
            style={{ filter: selectedFilter }}
            muted
            autoPlay
          />

          <div className="mb-4 flex gap-2 flex-wrap justify-center">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedFilter === filter.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                } hover:bg-blue-500 hover:text-white transition`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleStopLive}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-lg"
          >
            End Live
          </button>

          <p className="mt-2 text-sm text-gray-300">
            🔴 Live - Shared with {followers.length + following.length} users
          </p>
        </>
      )}
    </div>
  );
}

export default LivePage;  

