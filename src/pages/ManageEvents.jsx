import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";
import UpdateEventModal from "../components/UpdateEventModal";
import Spinner from "../components/Spinner";

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const [editingEvent, setEditingEvent] = useState(null);

  const { data: myEvents = [], isLoading, isError } = useQuery({
    queryKey: ["my-events", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get("/events", {
        params: { email: user.email },
      });
      return res.data;
    },
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: async (eventId) => {
      return axiosInstance.delete(`/events/${eventId}`, {
        params: { email: user.email },
      });
    },
    onSuccess: () => {
      toast.success("Event deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["my-events", user?.email] });
    },
    onError: () => {
      toast.error("Failed to delete event");
    },
  });

  const handleDelete = (eventId, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteMutation.mutate(eventId);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 py-20">
        Failed to load your events.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Manage My Events
      </h1>

      {myEvents.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          You haven't created any events yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-green-50 text-green-800 text-sm">
              <tr>
                <th className="px-5 py-3">Event</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myEvents.map((event) => (
                <tr key={event._id} className="border-t border-gray-100">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <span className="font-medium text-gray-800">
                      {event.title}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                      {event.eventType}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {new Date(event.eventDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3 flex gap-3">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="text-green-700 text-sm font-medium hover:underline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(event._id, event.title)}
                      className="text-red-600 text-sm font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingEvent && (
        <UpdateEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </div>
  );
};

export default ManageEvents;