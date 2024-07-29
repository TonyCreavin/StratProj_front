import { useNavigate } from 'react-router-dom';
import Form from '../components/RegistrationForm';
import axios from 'axios';
import { useState } from 'react';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/register',
        formData,
        {
          withCredentials: true,
        }
      );

      console.log('Registration successful:', response.data);
      // Save token in local storage or context
      localStorage.setItem('token', response.data.token);
      // Handle success (e.g., redirect to dashboard or login page)
      navigate('/login');
    } catch (err) {
      console.error(
        'Registration failed:',
        err.response ? err.response.data : err.message
      );
      // Handle error (e.g., display error message)
    }
  };

  const handleReturn = () => {
    navigate('/login');
  };

  return (
    <>
      <h1 className="text-3xl font-semibold font-marker text-center mt-20">
        Registration Page
      </h1>
      <Form
        handleReturn={handleReturn}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </>
  );
}

export default Register;
