"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function EventsExplorer() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5001/events"); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Cargando eventos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#2a1a4a] text-white">
      {/* Header */}
      <Header />

      {/* Event Cards */}
      <div className="py-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 lg:px-24">
        {events.map((event) => (
          <div
            key={event.id_event}
            className="cursor-pointer bg-gradient-to-b from-[#1A1A2E] to-[#2A2A3E] rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            {/* Event Header */}
            <div className="relative h-48 bg-gray-800 flex items-center justify-center">
              <span className="absolute top-4 right-4 bg-purple-700 text-white px-3 py-1 text-sm rounded-full">
                {event.id_event % 3 === 0
                  ? "Fiesta"
                  : event.id_event % 3 === 1
                  ? "Social"
                  : "Entretenimiento"}
              </span>
              <img
                src="/event.png"
                alt={event.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Event Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {event.description || "No description available."}
              </p>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Saturday, January 20</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>18:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {event.subscribers.length}/{event.max_capacity} attending
                  </span>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <div className="px-6 pb-6">
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                Join Event
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        © 2025 Tango. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default EventsExplorer;
