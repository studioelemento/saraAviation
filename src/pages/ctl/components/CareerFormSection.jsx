import React, { useState } from "react";

const CareerFormSection = () => {
  const [step, setStep] = useState(1);

  return (
    <section className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80"
            alt="Pilot"
            className="rounded-xl w-[300px] md:w-[350px] object-cover shadow-lg"
          />
        </div>

        {/* Right Content */}
        <div>
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Begin Your{" "}
            <span className="text-blue-600">Aviation Career</span>{" "}
            Today!
          </h2>

          {/* Subtext */}
          <p className="text-gray-600 mb-8 max-w-md">
            See how we can help you achieve your goals. Fill out the form below,
            and one of our mentors will get in touch with you soon!
          </p>

          {/* Form */}
          <form className="space-y-6">
            
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name*"
                className="w-full px-4 py-3 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-3 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email*"
                className="w-full px-4 py-3 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="+91 Phone Number*"
                className="w-full px-4 py-3 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Progress */}
            <div>
              <p className="text-sm mb-2">1/2</p>
              <div className="w-full bg-gray-300 h-2 rounded-full">
                <div className="bg-blue-900 h-2 rounded-full w-1/2"></div>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition"
              >
                Next
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default CareerFormSection;