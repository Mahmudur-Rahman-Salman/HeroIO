import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router";

const Banner = () => {
  return (
    <>
      <section className="bg-gray-100 py-30">
        <div className="max-w-5xl mx-auto text-center px-6">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Discover & Install Your Favorite Apps
          </h1>

          {/* Description */}
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Explore top-rated apps, track downloads, and manage your
            installations in one powerful platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded hover:opacity-90"
            >
              <FaApple /> App Store
            </Link>

            <Link
              to="https://play.google.com/store/games?hl=en"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#7E45EA] text-white rounded hover:opacity-90"
            >
              <FaGooglePlay /> Play Store
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
