import { useCallback, useRef } from 'react';
import useAgencyStore from '../store/useAgencyStore';
import { DEBOUNCE_DELAY } from '../config/constants';

export function useAgencySearch() {
  const { search, setSearch } = useAgencyStore();
  const timerRef = useRef(null);

  const debouncedSearch = useCallback((query) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearch(query);
    }, DEBOUNCE_DELAY);
  }, [setSearch]);

  const handleSearch = useCallback((e) => {
    const query = typeof e === 'string' ? e : e.target.value;
    debouncedSearch(query);
  }, [debouncedSearch]);

  const clearSearch = useCallback(() => {
    setSearch('');
  }, [setSearch]);

  return {
    search,
    handleSearch,
    clearSearch,
    setSearch,
  };
}

export default useAgencySearch;
