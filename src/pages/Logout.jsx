import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/login');
  }, [navigate]);

  return null;
}
