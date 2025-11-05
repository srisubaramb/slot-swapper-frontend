import { useState, useEffect } from "react";
import { getSwapHistory } from "../api";

// History component for displaying past swap activities
export default function History() {
  const [history, setHistory] = useState([]); // Array of past swap events
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch swap history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getSwapHistory();
        setHistory(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch swap history:", err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Show loading state while fetching data
  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">History</h2>
        <p className="text-gray-500 text-center py-6">Loading history...</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">History</h2>

      {/* Display history events or empty state */}
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((event) => (
            <li
              key={event._id}
              className="p-4 bg-white rounded-lg shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.startTime).toLocaleString()} -{" "}
                    {new Date(event.endTime).toLocaleString()}
                  </p>
                </div>
                {/* Status badge with color coding */}
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    event.status === "ACCEPTED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-6">No history yet.</p>
      )}
    </main>
  );
}
