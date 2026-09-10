import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const { _id, title, thumbnail, location, eventType, eventDate } = event;

  const formattedDate = new Date(eventDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-lg transition">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-44 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <span className="inline-block w-fit text-xs font-medium bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2.5 py-1 rounded-full mb-2">
          {eventType}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          📍 {location}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          📅 {formattedDate}
        </p>
        <Link
          to={`/events/${_id}`}
          className="mt-auto bg-green-600 dark:bg-green-500 text-white text-center py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition"
        >
          View Event
        </Link>
      </div>
    </div>
  );
};

export default EventCard;