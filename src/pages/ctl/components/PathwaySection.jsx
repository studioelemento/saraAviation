import React from "react";


const pathways = [
  {
    title: "Integrated Pilot Mentorship",
    desc: "A comprehensive end-to-end commercial pilot training program encompassing DGCA ground subjects, flying training, and full visa and documentation support.",
    img: "https://images.unsplash.com/photo-1581091870627-3a4c1e6b1d6b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Flying Training Abroad",
    desc: "Structured pathways to USA, New Zealand, Spain and Greece. FAA/EASA/CAA aligned training programs ensuring global standards and efficient timeline management.",
    img: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "License Conversion",
    desc: "Specialized support for international license holders to convert their foreign licenses to Indian DGCA requirements smoothly and compliantly.",
    img: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1200&q=80",
  },
];

const PathwaysSection = () => {
  return (
    <section className="bg-gray-100 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-blue-600">Structured Pathways</span>{" "}
          for Every Aspirant
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Choose the program that aligns with your current stage in the aviation
          journey. Designed for clarity, efficiency, and compliance.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pathways.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PathwaysSection;