import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './context/protectedRoute';
import Profile from './pages/Profile';
import './axiosConfig';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  {
    path: '/logout',
    element: (
      <ProtectedRoute>
        <Logout />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
