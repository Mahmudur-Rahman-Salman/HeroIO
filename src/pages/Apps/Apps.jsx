import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

const Apps = () => {
  const appsData = useLoaderData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApps, setFilteredApps] = useState(appsData);
  const [loading, setLoading] = useState(false);

  // 🔥 Search Handler (with simulated loading)
  const handleSearch = (value) => {
    setSearchTerm(value);
    setLoading(true);

    setTimeout(() => {
      const result = appsData.filter((app) =>
        app.title.toLowerCase().includes(value.toLowerCase()),
      );

      setFilteredApps(result);
      setLoading(false);
    }, 400);
  };

  return (
    <>
      <div className="p-6 text-black max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="mb-6 p-10 text-center">
          <h1 className="text-3xl font-bold">Our All Applications</h1>
          <p className="text-gray-600 mt-1">
            Explore all apps built for performance, scalability, and real users.
          </p>
        </div>

        {/* Search & Count */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-medium">Total Apps: {filteredApps.length}</span>

          <input
            type="text"
            placeholder="Search apps..."
            className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* 🔥 Loading State */}
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredApps.length > 0 ? (
          /* App Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-200"
                onClick={() => navigate(`/apps/${app.id}`)}
              >
                <img
                  src={app.image}
                  alt={app.title}
                  className="h-32 w-full object-contain mb-4"
                />

                <h2 className="font-semibold text-lg">{app.title}</h2>

                <p className="text-gray-500 text-sm mt-1">
                  Downloads: {app.downloads.toLocaleString()}
                </p>

                <p className="text-yellow-500 mt-1">
                  Rating: {app.ratingAvg} ⭐
                </p>
              </div>
            ))}
          </div>
        ) : (
          /* Not Found */
          <div className="text-center text-gray-500 mt-10">No App Found</div>
        )}
      </div>
    </>
  );
};

export default Apps;
