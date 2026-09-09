import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="text-6xl font-bold text-green-700">404</h1>
      <p className="text-lg text-gray-600">Oops! This page doesn't exist.</p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;