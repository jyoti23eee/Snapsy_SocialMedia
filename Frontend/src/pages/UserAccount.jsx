import React, { useState } from 'react';

function UserAccount() {
  const [user, setUser] = useState({
    username: 'john_doe',
    name: 'John Doe',
    bio: 'Traveler | Photographer | Foodie',
    followers: 1200,
    following: 850,
    posts: 34,
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold">{user.username}</h2>
        <p className="text-gray-800">{user.name}</p>
        <p className="text-gray-600">{user.bio}</p>
      </div>

      <div className="flex justify-around mt-4">
        <div className="text-center">
          <h3 className="text-lg font-bold">{user.posts}</h3>
          <p className="text-gray-600">Posts</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">{user.followers}</h3>
          <p className="text-gray-600">Followers</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">{user.following}</h3>
          <p className="text-gray-600">Following</p>
        </div>
      </div>

      <button
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleEdit}
      >
        {editing ? 'Save' : 'Edit Profile'}
      </button>

      {editing && (
        <div className="mt-4">
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
          />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
          />
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
          />
        </div>
      )}
    </div>
  );
}

export default UserAccount;

