import React from "react";
import { useHistory } from "../hooks/useHistory";

export default function HistoryFeed() {
  const { entries, loading, error, refresh } = useHistory();

  if (loading) return <p>Loading history…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Unified History</h2>
      <button onClick={refresh}>Refresh</button>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.type.toUpperCase()}</strong> {entry.direction} — {entry.status}
            {entry.message && <span>: {entry.message}</span>}
            <small> @ {new Date(entry.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
