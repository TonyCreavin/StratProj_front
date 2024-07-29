import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';
import Form from '../components/ProfileForm';
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
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        formData={formData}
      />
    </>
  );
};

export default Profile;
