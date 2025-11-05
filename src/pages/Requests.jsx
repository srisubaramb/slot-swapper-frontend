import { useState, useEffect } from "react";
import { getSwapRequests, respondToSwapRequest } from "../api";

// Requests component for managing incoming and outgoing swap requests
export default function Requests() {
  const [requests, setRequests] = useState([]); // Array of swap requests
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch swap requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getSwapRequests();
        setRequests(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch swap requests:", err);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Handle accept/decline responses to swap requests
  const handleRespond = async (id, status) => {
    try {
      await respondToSwapRequest(id, status);
      // Refresh requests list after response
      const res = await getSwapRequests();
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to respond to swap request:", err);
      alert("Failed to respond to request");
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Requests</h2>
        <p className="text-gray-500 text-center py-6">Loading requests...</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Requests</h2>

      {/* Display requests or empty state */}
      {requests.length > 0 ? (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div>
                {/* Display different text for incoming vs outgoing requests */}
                {req.type === 'incoming' ? (
                  <>
                    <p className="font-medium text-gray-800">
                      {req.fromUser} wants to swap{" "}
                      <span className="font-semibold">{req.myEventTitle}</span> for your{" "}
                      <span className="font-semibold">{req.eventTitle}</span>
                    </p>
                    <p className="text-sm text-gray-500">Status: {req.status}</p>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-gray-800">
                      You requested to swap{" "}
                      <span className="font-semibold">{req.myEventTitle}</span> for{" "}
                      <span className="font-semibold">{req.toUser}'s {req.eventTitle}</span>
                    </p>
                    <p className="text-sm text-gray-500">Status: {req.status}</p>
                  </>
                )}
              </div>

              {/* Show action buttons only for pending incoming requests */}
              {req.type === 'incoming' && req.status === "PENDING" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRespond(req._id, "ACCEPTED")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRespond(req._id, "DECLINED")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Decline
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-6">No requests yet.</p>
      )}
    </main>
  );
}
