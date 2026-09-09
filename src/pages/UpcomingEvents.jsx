import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import EventCard from "../components/EventCard";

const eventTypes = [
  "all",
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Camp",
  "Food Drive",
  "Elderly Care",
];

const UpcomingEvents = () => {
  const axiosInstance = useAxios();
  const [type, setType] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ["upcoming-events", type, search],
    queryFn: async () => {
      const res = await axiosInstance.get("/events", {
        params: { type, search },
      });
      return res.data;
    },
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Upcoming Events
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 flex-grow">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search events by name..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Search
          </button>
        </form>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {eventTypes.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All Types" : t}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-green-600"></span>
        </div>
      )}

      {isError && (
        <p className="text-center text-red-600 py-10">
          Failed to load events. Please try again later.
        </p>
      )}

      {!isLoading && !isError && events.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No upcoming events found.
        </p>
      )}

      {!isLoading && !isError && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;