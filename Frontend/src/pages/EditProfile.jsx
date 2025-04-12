import React, { useState } from 'react';
import { FiUser, FiMail, FiLink, FiEdit } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

function EditProfile() {
  const [profile, setProfile] = useState({
    username: 'johndoe',
    fullName: 'John Doe',
    bio: 'Digital creator | Photography enthusiast',
    website: 'johndoe.com',
    email: 'john@doe.com',
    phone: '+1 234 567 8900',
    gender: 'Male',
    isPrivate: false
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('https://randomuser.me/api/portraits/men/1.jpg');
  const [showChangePhoto, setShowChangePhoto] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setShowChangePhoto(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Profile updated:', { ...profile, profileImage });
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-sky-900 ">
      <h1 className="text-4xl font text-white bold mb-6">Edit Profile</h1>
      
      <div className="flex items-center mb-8 relative">
        <div className="relative group">
          <img 
            src={imagePreview} 
            alt="Profile" 
            className="w-16 h-16 rounded-full object-cover"
          />
          <button 
            onClick={() => setShowChangePhoto(!showChangePhoto)}
            className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiEdit className="text-white" />
          </button>
        </div>
        
        {showChangePhoto && (
          <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md p-4 z-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-300">Change Profile Photo</h3>
              <button onClick={() => setShowChangePhoto(false)}>
                <IoMdClose />
              </button>
            </div>
            <label className="block py-2 px-4 text-white font-semibold cursor-pointer">
              Upload Photo
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <button className="block w-full py-2 px-4 text-red-500 font-semibold">
              Remove Current Photo
            </button>
            <button 
              className="block w-full py-2 px-4 text-gray-700"
              onClick={() => setShowChangePhoto(false)}
            >
              Cancel
            </button>
          </div>
        )}
        
        <div className="ml-6">
          <h2 className="text-lg  text-white font-semibold">{profile.username}</h2>
          <button 
            className="text-white font-semibold"
            onClick={() => setShowChangePhoto(!showChangePhoto)}
          >
            Change Profile Photo
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              className="pl-10 w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows="3"
            maxLength="150"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-xs text-gray-500 text-right">{profile.bio.length}/150</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLink className="text-gray-400" />
            </div>
            <input
              type="url"
              name="website"
              value={profile.website}
              onChange={handleChange}
              className="pl-10 w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="pl-10 w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="privateAccount"
            name="isPrivate"
            checked={profile.isPrivate}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="privateAccount" className="text-sm font-medium text-white">
            Private Account
          </label>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded font-medium text-white"
          >
            Temporarily Disable My Account
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;

