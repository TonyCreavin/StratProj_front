import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/login',
        data
      );
      console.log('Login successful:', response.data);
      // Handle success (e.g., redirect to dashboard)

      const token = response.data.token;
      const userId = response.data.data.user._id;
      console.log('userId from login response:', userId);
      localStorage.setItem('userId', userId);

      login(token); // Use login function from AuthContext
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  return (
    <>
      <h1 className="text-3xl font-semibold font-marker text-center mt-20">
        Login Page
      </h1>
      <form method="post" onSubmit={handleSubmit} className="m-5 mt-20 md:m-20">
        <div className="flex flex-col md:flex-row md:gap-20 justify-between flex-1">
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
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="john.doe@company.com"
              required
            />
          </div>
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
              required
            />
          </div>
        </div>
        <div className="flex flex-row-reverse gap-6 justify-between">
          <div className=" w-52">
            <button
              type="submit"
              className="text-white text-lg font-bold font-indie bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg w-full  px-5 py-2.5 text-center  "
            >
              Submit
            </button>
          </div>
          <div className=" w-52 ">
            <button
              onClick={() => navigate('/register')}
              className="text-white bg-[rgb(53,175,53)] hover:bg-[rgb(108,172,108)]  focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg  w-full  px-5 py-2.5 text-center text-lg font-bold font-indie "
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
