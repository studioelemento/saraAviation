import React from "react";

export default function AirlinePartners({ title = "Careers Take Off with Top Airlines" }) {
  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-5">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="bg-white rounded-lg h-13 sm:h-28 flex items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 overflow-hidden"
            >
              <img 
                src={logo}
                alt="career partner"
                className="w-full h-full object-contain sm:object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const logos = [




  
  "/assets/partners/Air Asia Logo.png",
  "/assets/partners/Air India Express Logo.png",
  "/assets/partners/Air India Logo.png",
  "/assets/partners/AirArabia Logo.png",
  "/assets/partners/Akasa Air Logo.png",
  "/assets/partners/American Airlines Logo.png",
  "/assets/partners/BWFS Logo.png",
  "/assets/partners/CelebiAviation Logo.png",
  "/assets/partners/EaseMyTrip logo.png",
  "/assets/partners/Emirates Logo.png",
  "/assets/partners/Etihad Airways Logo.png",
  "/assets/partners/GMR Group Logo.png",
  "/assets/partners/Harley Davidson Logo.png",
  "/assets/partners/ITC Limited Logo.png",
  "/assets/partners/Indigo Logo.png",
  "/assets/partners/JW Marriott logo.png",
  "/assets/partners/Kuwait Airways Logo.png",
  "/assets/partners/Oberoi  Logo.png",
  "/assets/partners/Park Hyatt Logo.png",
  "/assets/partners/Qatar Airways Logo.png",
  "/assets/partners/Radisson Logo.png",
  "/assets/partners/SpiceJet Logo.png",
  "/assets/partners/Star Air Logo.png",
  "/assets/partners/Taj Logo.png",
  "/assets/partners/The leela Group Logo.png",
  "/assets/partners/VFS Global Logo.png",
  "/assets/partners/Vistara Logo.png",
  "/assets/partners/Westin Hotels Logo.png"
];

