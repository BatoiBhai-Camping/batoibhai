import { useState, useEffect, useCallback } from "react";
import type { ApiResponse } from "@/lib/api";

interface UseApiState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  fallback: T,
  autoFetch = true
): UseApiState<T> {
  const [data, setData] = useState<T>(fallback);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      if (result.success && result.data !== null) {
        setData(result.data);
      } else {
        setData(fallback);
        if (!result.success) {
          setError(result.message || "Failed to fetch data");
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Network error";
      setData(fallback);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [fallback, fetcher]);

  useEffect(() => {
    if (autoFetch) {
      void fetchData();
    }
  }, [autoFetch, fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
