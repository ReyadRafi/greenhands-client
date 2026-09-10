import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";
import Spinner from "../components/Spinner";  

const JoinedEvents = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const { data: joinedEvents = [], isLoading, isError } = useQuery({
    queryKey: ["joined-events", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get("/joined-events", {
        params: { email: user.email },
      });
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 py-20">
        Failed to load your joined events.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Joined Events
      </h1>

      {joinedEvents.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">
            You haven't joined any events yet.
          </p>
          <Link
            to="/upcoming-events"
            className="inline-block bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition"
          >
            Browse Upcoming Events
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-green-50 text-green-800 text-sm">
              <tr>
                <th className="px-5 py-3">Event</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {joinedEvents.map((je) => (
                <tr key={je._id} className="border-t border-gray-100">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <img
                      src={je.eventThumbnail}
                      alt={je.eventTitle}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <span className="font-medium text-gray-800">
                      {je.eventTitle}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                      {je.eventType}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {je.eventLocation}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {new Date(je.eventDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      to={`/events/${je.eventId}`}
                      className="text-green-700 text-sm font-medium hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;