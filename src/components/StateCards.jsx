import React from "react";

const StateCards = ({title, value, description}) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
        <h3 className="text-gray-500 text-sm">{title}</h3>

        <h2 className="text-3xl font-bold text-[#7E45EA] mt-2">{value}</h2>

        <p className="text-gray-600 text-sm mt-2">{description}</p>
      </div>
    </>
  );
};

export default StateCards;
