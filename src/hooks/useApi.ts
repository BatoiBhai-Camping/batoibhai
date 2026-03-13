import { useState, useEffect, useCallback } from "react";

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Generic hook for API data fetching with fallback support.
 * Falls back to provided default data if API call fails.
 */
export function useApi<T>(
  fetcher: () => Promise<{ success: boolean; data: T | null; message: string }>,
  fallback: T,
  autoFetch = true
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        // Use fallback data if API fails
        setData(fallback);
        if (!result.success) {
          setError(result.message || "Failed to fetch data");
        }
      }
    } catch (err: any) {
      setData(fallback);
      setError(err?.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, fallback]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data: data ?? fallback, isLoading, error, refetch: fetchData };
}
