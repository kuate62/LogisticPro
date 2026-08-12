import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AUTH_STATUS, ROLES } from '../../config/constants';
import { getHomePath } from '../../utils/homePath';

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, status } = useAuth();
  const location = useLocation();

  if (status === AUTH_STATUS.LOADING) {
    return (
      <div className="lp-loading-screen">
        <div className="lp-loading-screen__spinner" />
      </div>
    );
  }

  if (status !== AUTH_STATUS.AUTHENTICATED || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === ROLES.SUPER_ADMIN && location.pathname === '/dashboard') {
    return <Navigate to="/admin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getHomePath(user)} replace />;
  }

  return children;
}

export default ProtectedRoute;
