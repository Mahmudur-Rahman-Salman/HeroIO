import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import AppCards from "./AppCards";

const TopApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/apps.json")
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Failed to load apps</p>
      </div>
    );
  }

  const topApps = [...apps]
    .sort((a, b) => b.ratingAvg - a.ratingAvg)
    .slice(0, 8);
  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Top Apps</h2>

            <Link
              to="/apps"
              className="text-[#7E45EA] font-medium hover:underline"
            >
              Show All →
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topApps.map((app) => (
              <AppCards key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TopApps;
