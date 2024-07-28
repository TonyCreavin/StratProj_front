import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log('ProtectedRoute: isAuthenticated:', isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
