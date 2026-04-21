import React from "react";

export default function AirlinePartners({ title = "Careers Take Off with Top Airlines" }) {
  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10">
          {title}
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="rounded-xl h-24 overflow-hidden shadow-sm hover:shadow-md transition group"
            >
              <img 
                src={logo}
                alt="airline"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const logos  = Array(15).fill("https://i.pinimg.com/1200x/2e/2b/89/2e2b893fbe64a47a9a14bb75f77b5527.jpg");
