import React from "react";
import { FaDownload, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const AppCards = ({ app }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/apps/${app.id}`)}
        className="bg-white text-black rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
      >
        {/* Image */}
        <img
          src={app.image}
          alt={app.title}
          className="w-40 h-40 mx-auto object-cover rounded-lg"
        />

        {/* Info */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg">{app.title}</h3>

          <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaDownload />
              {app.downloads.toLocaleString()}
            </span>

            <span className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              {app.ratingAvg}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppCards;
