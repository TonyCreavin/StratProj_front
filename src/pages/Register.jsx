import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleReturn = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <>
      <h1 className="text-3xl font-semibold font-marker text-center mt-20">
        Registration Page
      </h1>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="mx-5 mt-20 md:m-20"
      >
        <div className="flex flex-col md:flex-row md:gap-20 justify-between flex-1">
          <div className="mb-6 flex-1">
            <label
              htmlFor="name"
              className="block mb-2 text-lg font-bold font-indie text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6 flex-1">
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-bold font-indie text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-20 justify-between flex-1">
          <div className="mb-6 flex-1">
            <label
              htmlFor="password"
              className="block mb-2 text-lg font-bold font-indie text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6 flex-1">
            <label
              htmlFor="passwordConfirm"
              className="block mb-2 text-lg font-bold font-indie text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-row-reverse gap-6 justify-between">
          <div className="w-52">
            <button
              type="submit"
              className="text-white text-lg font-bold font-indie bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg w-full  px-5 py-2.5 text-center  "
            >
              Submit
            </button>
          </div>{' '}
          <div className="w-52">
            <button
              type="button"
              onClick={handleReturn}
              className="text-white text-lg font-bold font-indie bg-[rgb(53,175,53)] hover:bg-[rgb(108,172,108)] focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg w-full  px-5 py-2.5 text-center  "
            >
              Return to Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Register;
