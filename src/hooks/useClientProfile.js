import { useEffect, useCallback } from 'react';
import useClientProfileStore from '../store/useClientProfileStore';

export function useClientProfile(clientId) {
  const store = useClientProfileStore();

  useEffect(() => {
    if (clientId) store.fetchProfile(clientId);
  }, [clientId]);

  const refresh = useCallback(() => {
    if (clientId) store.fetchProfile(clientId);
  }, [clientId]);

  const updateProfile = useCallback((data) => {
    if (clientId) return store.updateProfile(clientId, data);
    return null;
  }, [clientId]);

  const changePassword = useCallback((data) => {
    if (clientId) return store.changePassword(clientId, data);
    return null;
  }, [clientId]);

  const uploadAvatar = useCallback((file) => {
    if (clientId) return store.uploadAvatar(clientId, file);
    return null;
  }, [clientId]);

  const removeAvatar = useCallback(() => {
    if (clientId) return store.removeAvatar(clientId);
    return null;
  }, [clientId]);

  const updatePreference = useCallback((key, value) => {
    store.updatePreference(key, value);
  }, []);

  return {
    ...store,
    refresh,
    updateProfile,
    changePassword,
    uploadAvatar,
    removeAvatar,
    updatePreference,
  };
}

export default useClientProfile;
