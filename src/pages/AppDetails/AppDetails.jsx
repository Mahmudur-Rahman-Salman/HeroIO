import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useLoaderData, useNavigation, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AppDetails = () => {
  const appsData = useLoaderData();
  const { id } = useParams();
  const app = appsData.find((a) => a.id === parseInt(id));
  const navigation = useNavigation();

  // Initialize installed state from localStorage
  const installedApps = JSON.parse(localStorage.getItem("installedApps")) || [];
  const [installed, setInstalled] = useState(
    installedApps.some((a) => a.id === parseInt(id)),
  );

  if (navigation.state === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!app)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">App Not Found</h2>
        <p className="text-gray-500 mt-2 max-w-md">
          The app you are looking for doesn’t exist or may have been removed.
        </p>
      </div>
    );

  const handleInstall = () => {
    const installedApps =
      JSON.parse(localStorage.getItem("installedApps")) || [];

    if (!installedApps.some((a) => a.id === app.id)) {
      installedApps.push(app);
      localStorage.setItem("installedApps", JSON.stringify(installedApps));
      setInstalled(true);
      toast.success(`${app.title} Installed Successfully!`);
    } else {
      toast.info(`${app.title} is already installed.`);
      setInstalled(true);
    }
  };
  return (
    <>
      <div className="p-6 max-w-7xl mx-auto text-black min-h-screen">
        {/* App Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="shrink-0 w-full md:w-1/3">
            <img
              src={app.image}
              alt={app.title}
              className="w-full h-64 object-contain rounded-lg border"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{app.title}</h1>
              <p className="text-gray-600 mb-2">{app.companyName}</p>
              <p className="text-yellow-500 font-semibold mb-2">
                Rating: {app.ratingAvg} ⭐
              </p>
              <p className="text-gray-500 mb-1">
                Downloads: {app.downloads.toLocaleString()}
              </p>
              <p className="text-gray-500 mb-1">
                Reviews: {app.reviews.toLocaleString()}
              </p>
            </div>

            <button
              className={`mt-4 px-6 py-2 rounded ${
                installed
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold transition`}
              onClick={handleInstall}
              disabled={installed}
            >
              {installed ? "Installed" : "Install"}
            </button>
          </div>
        </div>

        {/* Review Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">App Reviews</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={app.ratings}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Description</h2>
          <p className="text-gray-700">{app.description}</p>
          <p className="text-gray-500 mt-2">Size: {app.size} MB</p>
        </div>
      </div>
    </>
  );
};

export default AppDetails;
