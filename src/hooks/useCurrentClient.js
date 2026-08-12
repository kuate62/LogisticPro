import { useCallback, useEffect, useState } from 'react';
import { clientsService } from '../api/clientsService';

export function useCurrentClient() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    clientsService.getMe()
      .then((data) => {
        if (!active) return;
        setClient(data);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [reloadKey]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setReloadKey((k) => k + 1);
  }, []);

  return { client, clientId: client?.id, loading, error, refetch };
}

export default useCurrentClient;
