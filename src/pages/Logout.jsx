import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    localStorage.removeItem('token');

    logout();
    navigate('/login');
  }, [logout, navigate]);

  return null;
}
