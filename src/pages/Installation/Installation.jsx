import React, { useState } from "react";
import { toast } from "react-toastify";

const Installation = () => {
  const [installedApps, setInstalledApps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("installedApps")) || [];
    } catch (err) {
      console.error("Failed to read installed apps from localStorage:", err);
      return [];
    }
  });
  const [sortOrder, setSortOrder] = useState("");

  const handleUninstall = (appId) => {
    const updatedApps = installedApps.filter((app) => app.id !== appId);
    setInstalledApps(updatedApps);
    localStorage.setItem("installedApps", JSON.stringify(updatedApps));
    toast.success("App uninstalled successfully!");
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    if (installedApps.length === 0) return;

    const sorted = [...installedApps].sort((a, b) => {
      if (order === "high-low") return b.downloads - a.downloads;
      if (order === "low-high") return a.downloads - b.downloads;
      return 0;
    });

    setInstalledApps(sorted);
  };
  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-7xl mx-auto text-black min-h-screen">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">My Installed Apps</h1>
          <p className="text-gray-600 mt-1">
            Manage all apps you have installed.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex justify-between items-center mb-4">
          {/* App count on the left */}
          <span className="font-medium text-gray-700">
            Total Installed: {installedApps.length}
          </span>

          {/* Sort Dropdown on the right */}
          <select
            className="border rounded px-3 py-2 focus:outline-none"
            value={sortOrder}
            onChange={handleSort}
          >
            <option value="">Sort by Downloads</option>
            <option value="high-low">High-Low</option>
            <option value="low-high">Low-High</option>
          </select>
        </div>

        {/* Installed Apps */}
        {installedApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {installedApps.map((app) => (
              <div
                key={app.id}
                className="border rounded p-4 flex flex-col items-center hover:shadow-lg transition"
              >
                <img
                  src={app.image}
                  alt={app.title}
                  className="h-32 w-full object-contain mb-4"
                />
                <h2 className="font-semibold text-lg">{app.title}</h2>
                <p className="text-gray-500 mt-1">
                  Downloads: {app.downloads.toLocaleString()}
                </p>
                <p className="text-yellow-500 mt-1">
                  Rating: {app.ratingAvg} ⭐
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
                  onClick={() => handleUninstall(app.id)}
                >
                  Uninstall
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No installed apps found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Installation;
