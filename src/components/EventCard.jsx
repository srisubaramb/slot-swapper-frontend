// src/components/EventCard.jsx
import React from "react";

const safeFormat = (date) => {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
};

export default function EventCard({ event, onDelete, onToggle, actionLabel, onAction }) {
  return (
    <li className="p-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {event.title || "Untitled Event"}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium">From:</span>{" "}
          {safeFormat(event.startTime || event.fromDate)}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">To:</span>{" "}
          {safeFormat(event.endTime || event.toDate)}
        </p>

        {event.status && (
          <button
            onClick={() => onToggle && onToggle(event._id)}
            className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full transition ${
              event.status === "SWAPPABLE"
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
          >
            {event.status}
          </button>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        {onDelete && (
          <button
            onClick={() => onDelete(event._id)}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        )}
        {onAction && (
          <button
            onClick={onAction}
            className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </li>
  );
}
