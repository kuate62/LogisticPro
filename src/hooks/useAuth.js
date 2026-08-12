import { useCallback } from 'react';
import useAuthStore from '../store/useAuthStore';
import { AUTH_STATUS } from '../config/constants';

export function useAuth() {
  const {
    user,
    token,
    status,
    error,
    login,
    register,
    logout,
    forgotPassword,
    verifyResetCode,
    resetPassword,
    verifyEmail,
    regenerateCode,
    checkAuth,
    clearError,
  } = useAuthStore();

  const isLoading = status === AUTH_STATUS.LOADING;
  const isAuthenticated = status === AUTH_STATUS.AUTHENTICATED;
  const isError = status === AUTH_STATUS.ERROR;

  const hasRole = useCallback(
    (role) => user?.role === role,
    [user]
  );

  const hasAnyRole = useCallback(
    (roles) => roles.includes(user?.role),
    [user]
  );

  return {
    user,
    token,
    companyId: user?.companyId ?? null,
    status,
    error,
    isLoading,
    isAuthenticated,
    isError,
    login,
    register,
    logout,
    forgotPassword,
    verifyResetCode,
    resetPassword,
    verifyEmail,
    regenerateCode,
    checkAuth,
    clearError,
    hasRole,
    hasAnyRole,
  };
}

export default useAuth;
