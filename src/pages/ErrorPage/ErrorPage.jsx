import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
        {/* Icon */}
        <div className="bg-red-100 p-6 rounded-full mb-6">
          <FaExclamationTriangle className="text-red-500 text-5xl" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800">404</h1>

        {/* Message */}
        <p className="text-xl mt-4 font-semibold text-gray-700">
          Oops! Page Not Found
        </p>

        <p className="text-gray-500 mt-2 max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
