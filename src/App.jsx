import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';

import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  { path: '/logout', element: <Logout /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
