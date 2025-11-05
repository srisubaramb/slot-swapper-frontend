import { useState, useEffect } from "react";
import { getEvents, addEvent, deleteEvent, toggleStatus} from "../api";
import EventCard from "../components/EventCard";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!title || !fromDate || !toDate) return;
    try {
      const res = await addEvent({ title, fromDate, toDate });
      setEvents([...events, res.data]);
      setTitle("");
      setFromDate("");
      setToDate("");
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add event:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  const handleToggle = async (id) => {
  try {
    const res = await toggleStatus(id); // your API call
    setEvents(events.map((e) => (e._id === id ? res.data : e)));
  } catch (err) {
    console.error("Failed to toggle status:", err);
  }
};

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Events</h2>

        <div className="bg-white rounded-xl shadow p-6">
          {events.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} onDelete={handleDelete} onToggle={handleToggle}/>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-6">
              You don’t have any events yet. Click{" "}
              <span className="font-semibold">+ Add Event</span> to create one.
            </p>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            + Add Event
          </button>
        </div>
      </main>

      {/* Modal (unchanged) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Event</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event Title"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  From
                </label>
                <input
                  type="datetime-local"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  To
                </label>
                <input
                  type="datetime-local"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Event
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
