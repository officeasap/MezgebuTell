import { useEffect, useState } from "react";
import { ApiResponse, FanytelHistoryEntry, FanytelHistoryResponse } from "../shared/contracts";
import { useFanytelStore } from "../shared/fanytelStore";

interface UseHistoryResult {
  entries: FanytelHistoryEntry[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useHistory(): UseHistoryResult {
  const { history, setHistory } = useFanytelStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/history/history");
      const json: ApiResponse<FanytelHistoryResponse> = await res.json();

      if (json.ok) {
        setHistory(json.data.entries);
      } else if ("code" in json) {
        setError(`${json.code}: ${json.message}`);
      }
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return { entries: history, loading, error, refresh: fetchHistory };
}
