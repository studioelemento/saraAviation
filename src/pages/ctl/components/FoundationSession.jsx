import React from "react";

const FoundationSection = () => {
  return (
    <section className="w-full bg-black py-20 px-4 flex justify-center">
      <div className="max-w-4xl w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 text-center shadow-xl">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
          Build the{" "}
          <span className="text-blue-500">Foundation</span>{" "}
          Every Airline Pilot Needs
        </h2>

        {/* Paragraph 1 */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
          At Aerogenesis Aviation Academy, we bridge the gap between basic flight
          training and true airline readiness. Our comprehensive commercial pilot
          training curriculum begins with a rigorous{" "}
          <span className="text-yellow-400">DGCA ground school</span>{" "}
          in Bangalore, ensuring a profound understanding of aviation theory
          before you ever step into a cockpit.
        </p>

        {/* Paragraph 2 */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          Transition seamlessly to our partner facilities in the{" "}
          <span className="text-yellow-400">
            USA, Spain, Greece & New Zealand
          </span>{" "}
          for world-class flight training. Under the direct mentorship of
          accomplished Airline Pilots & IAF veterans, you will develop the
          precision, critical decision-making skills, and advanced airmanship
          required to excel in the modern flight deck.
        </p>

      </div>
    </section>
  );
};

export default FoundationSection;