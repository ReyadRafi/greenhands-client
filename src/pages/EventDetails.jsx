import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Event Details for ID: {id}</h1>
    </div>
  );
};

export default EventDetails;