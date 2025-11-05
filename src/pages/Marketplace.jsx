import { useState, useEffect } from "react";
import { getSwappableSlots, getEvents, createSwapRequest } from "../api";
import EventCard from "../components/EventCard";

// Marketplace component for browsing and requesting event swaps
export default function Marketplace() {
  // State for managing marketplace data and UI
  const [events, setEvents] = useState([]); // Available swappable events from other users
  const [myEvents, setMyEvents] = useState([]); // User's own swappable events
  const [selectedMyEvent, setSelectedMyEvent] = useState(""); // Selected event to offer in swap
  const [showModal, setShowModal] = useState(false); // Modal visibility for swap request
  const [selectedEvent, setSelectedEvent] = useState(null); // Event being requested
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch marketplace data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both available slots and user's own events in parallel
        const [swappableRes, myEventsRes] = await Promise.all([
          getSwappableSlots(),
          getEvents()
        ]);
        setEvents(Array.isArray(swappableRes.data) ? swappableRes.data : []);
        // Filter user's events to only show swappable ones
        setMyEvents(myEventsRes.data.filter(e => e.status === 'SWAPPABLE'));
      } catch (err) {
        console.error("Failed to fetch marketplace data:", err);
        setEvents([]);
        setMyEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle swap request initiation - opens modal for event selection
  const handleRequestSwap = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Submit swap request after user selects their event to offer
  const handleSubmitRequest = async () => {
    if (!selectedMyEvent) return;

    try {
      await createSwapRequest({
        mySlotId: selectedMyEvent,
        theirSlotId: selectedEvent._id
      });

      // Reset modal state and refresh marketplace data
      setShowModal(false);
      setSelectedMyEvent("");
      setSelectedEvent(null);

      const swappableRes = await getSwappableSlots();
      setEvents(Array.isArray(swappableRes.data) ? swappableRes.data : []);
    } catch (err) {
      console.error("Failed to create swap request:", err);
      alert("Failed to send swap request.");
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Marketplace</h2>
        <p className="text-gray-500 text-center py-6">Loading marketplace...</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Marketplace</h2>

      {/* Display available events or empty state */}
      {events.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              actionLabel="Request Swap"
              onAction={() => handleRequestSwap(event)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-6">
          No swappable events available right now.
        </p>
      )}

      {/* Modal for selecting user's event to offer in swap */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Select Your Slot to Offer</h3>
            <p className="text-sm text-gray-600 mb-4">
              Offering: <strong>{selectedEvent?.title}</strong>
            </p>
            <select
              value={selectedMyEvent}
              onChange={(e) => setSelectedMyEvent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            >
              <option value="">Select your event</option>
              {myEvents.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleSubmitRequest}
                disabled={!selectedMyEvent}
                className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                Send Request
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedMyEvent("");
                  setSelectedEvent(null);
                }}
                className="px-4 py-2 text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
