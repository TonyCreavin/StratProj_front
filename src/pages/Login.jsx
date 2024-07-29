import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Form from '../components/LoginForm';

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
      <Form handleSubmit={handleSubmit} navigate={navigate} />
    </>
  );
}

export default Login;
