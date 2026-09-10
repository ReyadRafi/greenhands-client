import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Camp",
  "Food Drive",
  "Elderly Care",
];

const UpdateEventModal = ({ event, onClose }) => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [eventDate, setEventDate] = useState(new Date(event.eventDate));

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      return axiosInstance.put(`/events/${event._id}`, {
        ...updatedData,
        requesterEmail: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Event updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-events", user?.email] });
      queryClient.invalidateQueries({ queryKey: ["event", event._id] });
      onClose();
    },
    onError: (error) => {
      const msg = error.response?.data?.message || "Failed to update event";
      toast.error(msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    updateMutation.mutate({
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      eventType: form.eventType.value,
      thumbnail: form.thumbnail.value.trim(),
      location: form.location.value.trim(),
      eventDate,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-700">Update Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={event.title}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={event.description}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <select
              name="eventType"
              required
              defaultValue={event.eventType}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail Image URL
            </label>
            <input
              type="text"
              name="thumbnail"
              required
              defaultValue={event.thumbnail}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              defaultValue={event.location}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Date
            </label>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              minDate={new Date()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-60"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventModal;