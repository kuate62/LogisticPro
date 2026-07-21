import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AUTH_STATUS } from '../../config/constants';

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, status } = useAuth();

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

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
