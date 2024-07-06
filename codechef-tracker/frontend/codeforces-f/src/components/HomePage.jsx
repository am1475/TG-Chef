import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
      if (response.data.status === 'OK') {
        navigate(`/dashboard/${username}`);
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="home-page p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Website</h1>
      <p className="text-lg mb-4">Track your Codeforces performance and get detailed analytics.</p>
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-2 text-lg font-bold" htmlFor="username">
          Enter your Codeforces Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Track
        </button>
      </form>
    </div>
  );
}

export default HomePage;
