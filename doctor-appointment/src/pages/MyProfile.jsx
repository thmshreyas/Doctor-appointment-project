import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const MyProfile = () => {
  const { user, fetchUserData } = useAuth();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    loadUserData();
  }, [user, navigate]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setNotification('Please log in to save your profile.');
        return;
      }

      await axios.put('http://localhost:5000/api/auth/update-profile', userData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setNotification('Profile updated successfully!');
      setIsEdit(false);
      if (user && token) {
        await fetchUserData(token); 
      }
      setTimeout(() => setNotification(''), 2000);
    } catch (err) {
      setNotification(err.response?.data?.message || 'Failed to update profile.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  if (!userData) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-md rounded-lg">
      {notification && (
        <div className={`mb-4 p-3 rounded text-center ${notification.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{notification}</div>
      )}
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-24 h-24 rounded-full border-2 border-primary bg-gray-200 flex items-center justify-center">
          <span className="text-2xl text-gray-600">{userData.name.charAt(0)}</span>
        </div>
        {
          isEdit ?
          <input 
            type="text" 
            value={userData.name || ''} 
            onChange={e => setUserData(prev => ({...prev, name: e.target.value}))} 
            className="text-xl font-semibold border-b-2 focus:outline-none" 
          />
          : <p className="text-xl font-semibold">{userData.name}</p>
        }
      </div>
      <hr className="mb-6" />
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="mb-6 md:w-1/2">
          <p className="text-lg font-medium mb-2">CONTACT INFORMATION</p>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Email:</p>
              <p className="text-gray-700">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Phone:</p>
              {
                isEdit ?
                <input 
                  type="text" 
                  value={userData.phone || ''} 
                  onChange={e => setUserData(prev => ({...prev, phone: e.target.value}))} 
                  className="border-b-2 focus:outline-none" 
                />
                : <p className="text-gray-700">{userData.phone || 'Not set'}</p>
              }
            </div>
            <div>
              <p className="text-sm font-medium">Address:</p>
              {
                isEdit ?
                <div className="space-y-2">
                  <input 
                    onChange={e => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} 
                    value={userData.address?.line1 || ''} 
                    type="text" 
                    className="border-b-2 focus:outline-none w-full" 
                  />
                  <input 
                    onChange={e => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} 
                    value={userData.address?.line2 || ''} 
                    type="text" 
                    className="border-b-2 focus:outline-none w-full" 
                  />
                </div>
                : <p className="text-gray-700">
                    {userData.address?.line1 || 'Not set'}<br />
                    {userData.address?.line2 || ''}
                  </p>
              }
            </div>
          </div>
        </div>
        <div className="mb-6 md:w-1/2">
          <p className="text-lg font-medium mb-2">BASIC INFORMATION</p>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Gender:</p>
              {
                isEdit ?
                <select 
                  onChange={e => setUserData(prev => ({...prev, gender: e.target.value}))} 
                  value={userData.gender || ''} 
                  className="border-b-2 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                : <p className="text-gray-700">{userData.gender || 'Not set'}</p>
              }
            </div>
            <div>
              <p className="text-sm font-medium">Birthday:</p>
              {
                isEdit ?
                <input 
                  type="date" 
                  onChange={e => setUserData(prev => ({...prev, dob: e.target.value}))} 
                  value={userData.dob || ''} 
                  className="border-b-2 focus:outline-none" 
                />
                : <p className="text-gray-700">{userData.dob || 'Not set'}</p>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        {
          isEdit ? 
          <button onClick={handleSave} className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark'>Save</button>
          : <button onClick={() => setIsEdit(true)} className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark'>Edit Profile</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;