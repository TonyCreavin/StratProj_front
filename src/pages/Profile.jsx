import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';

import { useAuth } from '../context/authContext';
import axios from 'axios';
const Profile = () => {
  const { isAuthenticated, logout } = useAuth();
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    postcode: '',
    country: '',
    phone: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      console.log('userId:', userId);
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.data && response.data.data.user) {
        setFormData(response.data.data.user);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      await axios.patch(
        `http://localhost:3000/api/v1/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Profile updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      await axios.delete(`http://localhost:3000/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Profile deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };
  const handleLogout = () => {
    logout();
    navigate('/logout');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <>
      <nav className="w-full h-17 bg-[rgb(80,154,177)] flex justify-between py-1">
        <div className="flex-1">
          <h1 className="text-white text-4xl text-center pl-24 font-concert">
            Edit Profile
          </h1>
        </div>{' '}
        <div className="flex justify-between">
          <ul className="flex justify-end">
            <li className="pr-5">
              <button onClick={handleHome}>
                <IoHomeOutline size={40} color="white" />
              </button>
              <p className="text-white text-xs">Home</p>
            </li>
            <li className="pr-5">
              <button onClick={handleLogout}>
                <IoLogOutOutline size={40} color="white" />
              </button>
              <p className="text-white text-xs">Logout</p>
            </li>
          </ul>
        </div>
      </nav>
      <h1 className="font-indie font-bold text-3xl m-3">
        Hello {formData.name}
      </h1>
      <form method="post" onSubmit={handleSubmit} className="mx-10">
        <div className="relative z-0 mb-6 w-full mt-5">
          <label
            htmlFor="street"
            className="block mb-2   text-gray-900 dark:text-white font-indie font-bold text-xl"
          >
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="1234 Elm St."
            value={formData.street || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="city"
            className="block mb-2   text-gray-900 dark:text-white font-indie font-bold text-xl"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            value={formData.city || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="postcode"
            className="block mb-2   text-gray-900 dark:text-white font-indie font-bold text-xl"
          >
            Postcode
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="56789"
            value={formData.postcode || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="country"
            className="block mb-2   text-gray-900 dark:text-white font-indie font-bold text-xl"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            value={formData.country || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block mb-2   text-gray-900 dark:text-white font-indie font-bold text-xl"
          >
            Phone number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            value={formData.phone || ''}
            onChange={handleChange}
          />
        </div>

        <div className="flex-auto lg:space-x-10">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-indie font-bold text-xl rounded-lg  w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
          >
            Submit
          </button>
        </div>
        <div className="flex-auto lg:space-x-10">
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-indie font-bold text-xl rounded-lg w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </>
  );
};

export default Profile;
