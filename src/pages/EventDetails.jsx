import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  // Fetch the event itself
  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/events/${id}`);
      return res.data;
    },
  });

  // Check if the current user has already joined (only runs if logged in)
  const { data: joinStatus } = useQuery({
    queryKey: ["join-status", id, user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get("/joined-events/check", {
        params: { eventId: id, email: user.email },
      });
      return res.data;
    },
    enabled: !!user, // only run this query if a user is logged in
  });

  const joinMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/joined-events", {
        eventId: id,
        userEmail: user.email,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("You've joined the event!");
      // Refresh the "already joined" check and the joined-events list
      queryClient.invalidateQueries({ queryKey: ["join-status", id, user?.email] });
      queryClient.invalidateQueries({ queryKey: ["joined-events"] });
    },
    onError: (error) => {
      const msg = error.response?.data?.message || "Failed to join event";
      toast.error(msg);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <p className="text-center text-red-600 py-20">
        Event not found or failed to load.
      </p>
    );
  }

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isOwnEvent = user && user.email === event.creatorEmail;
  const alreadyJoined = joinStatus?.joined;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <img
        src={event.thumbnail}
        alt={event.title}
        className="w-full h-72 object-cover rounded-2xl mb-6"
      />

      <span className="inline-block text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full mb-3">
        {event.eventType}
      </span>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
        <span>📍 {event.location}</span>
        <span>📅 {formattedDate}</span>
        <span>👤 Organized by {event.creatorName}</span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-8">{event.description}</p>

      {!user && (
        <Link
          to="/login"
          state={{ from: { pathname: `/events/${id}` } }}
          className="inline-block bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition"
        >
          Login to Join This Event
        </Link>
      )}

      {user && isOwnEvent && (
        <p className="text-sm text-gray-500 italic">
          This is your own event — you can't join it.
        </p>
      )}

      {user && !isOwnEvent && (
        <button
          onClick={() => joinMutation.mutate()}
          disabled={alreadyJoined || joinMutation.isPending}
          className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {alreadyJoined
            ? "Already Joined ✓"
            : joinMutation.isPending
            ? "Joining..."
            : "Join Event"}
        </button>
      )}
    </div>
  );
};

export default EventDetails;