import React from "react";

const CTLHero = () => {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center text-white">
      {/* Background */}
      <img
        src={'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80'}
        alt="Pilot Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        <button className="mb-6 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition">
          Become a Pilot
        </button>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Integrated Pilot <br /> Mentorship Program
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10">
          A structured, end-to-end CPL programme — DGCA ground school in
          Bangalore, flying training abroad, and licence conversion on return —
          guided by licensed pilots who have done it themselves.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">18–20</h2>
            <p className="text-gray-400 text-sm">Months to DGCA CPL</p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">6–8</h2>
            <p className="text-gray-400 text-sm">
              Months Saved vs Unguided
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Curated</h2>
            <p className="text-gray-400 text-sm">
              Program Designed by Airline Pilots
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">60–65L</h2>
            <p className="text-gray-400 text-sm">
              All-Inclusive CPL Cost
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTLHero;