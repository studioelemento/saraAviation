import React from "react";

export default function AviationCourses() {
  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Content */}
        <div className="max-w-3xl mb-12 text-left">
          <p className="text-sm text-gray-600 mb-3">
            Sara Institute of Aviation & Hospitality
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-relaxed">
            India’s <span className="font-bold underline decoration-red-500">prestigious</span> aviation training institute based in Bangalore, dedicated to providing world-class programs that equip aspiring professionals for successful careers in airlines, airports, and the hospitality industry.
          </h2>

          <a href="#" className="text-blue-600 mt-4 inline-block font-medium">
            Know More
          </a>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            Courses We Offer
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">✈️</div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">
                      {course.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const courses = [
  {
    title:
      "Sara Diploma Course in Aviation, Hospitality and Travel Management",
    duration: "Duration: 12 Months, 5 days/week (Mon-Fri) 2 hours",
  },
  {
    title: "Airport Operations Fundamentals",
    duration: "Duration: 6 Months, 5 days/week (Mon-Fri) 2 hours",
  },
  {
    title: "Passenger Ground Services Course",
    duration: "Duration: 6 Months, 5 days/week (Mon-Fri) 2 hours",
  },
  {
    title: "Airport Ramp Services Training",
    duration: "Duration: 6 Months, 5 days/week (Mon-Fri) 2 hours",
  },
  {
    title: "Foundation in Travel & Tourism with Amadeus",
    duration: "Duration: 6 Months, 5 days/week (Mon-Fri) 2 hours",
  },
  {
    title: "Cargo Introductory Course",
    duration: "Duration: 6 Months, 5 days/week (Mon-Fri) 2 hours",
  },
];
