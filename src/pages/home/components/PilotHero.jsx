import React from "react";

export default function PilotHero() {
  return (
    <section className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Your <br />
            <span className="text-blue-600">Commercial Pilot</span> <br />
            Journey Starts <br />
            Here
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed">
            Commercial Pilot Training in India & Abroad <br />
            Integrated Pilot Mentorship Program <br />
            Flying Training in USA, New Zealand, Spain & Greece <br />
            DGCA Licence Conversion
          </p>

          <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition">
            Start Your CPL Journey
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="Private Jet"
            className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
