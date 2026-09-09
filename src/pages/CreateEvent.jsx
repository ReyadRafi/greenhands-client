import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate) {
      toast.error("Please select an event date");
      return;
    }

    const form = e.target;
    const eventData = {
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      eventType: form.eventType.value,
      thumbnail: form.thumbnail.value.trim(),
      location: form.location.value.trim(),
      eventDate: startDate,
      creatorEmail: user.email,
      creatorName: user.displayName,
    };

    setSubmitting(true);

    axiosInstance
      .post("/events", eventData)
      .then(() => {
        toast.success("Event created successfully!");
        navigate("/upcoming-events");
      })
      .catch((error) => {
        const msg =
          error.response?.data?.message || "Failed to create event. Please try again.";
        toast.error(msg);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Create a New Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 space-y-4 border border-gray-100"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g., Community Beach Cleanup"
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
            rows={4}
            placeholder="Describe what this event is about..."
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
            defaultValue=""
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              Select a type
            </option>
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
            placeholder="https://example.com/image.jpg"
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
            placeholder="e.g., Cox's Bazar Beach"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            placeholderText="Select a future date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Created By
          </label>
          <input
            type="text"
            value={user?.email || ""}
            disabled
            className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg text-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;