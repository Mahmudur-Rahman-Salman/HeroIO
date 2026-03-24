import React from "react";
import StateCards from "./StateCards";

const StatsSection = () => {
  const stats = [
    {
      title: "Total Downloads",
      value: "21M",
      description: "21% more than last month",
    },
    {
      title: "Total Reviews",
      value: "900K",
      description: "48% more than last month",
    },
    {
      title: "Active Apps",
      value: "132+",
      description: "31 more will launch",
    },
  ];

  return (
    <section className="py-16 bg-[#7E45EA]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Trusted by Millions
        </h2>

        <p className="text-gray-50 mt-3">
          Built for you — fast, reliable, and growing every day.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {stats.map((stat, index) => (
            <StateCards
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
