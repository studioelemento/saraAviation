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

          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed font-outfit">
            Sara Institute of Aviation & Hospitality, Bangalore, is a premier training institute committed to shaping the next generation of aviation and hospitality professionals. With a strong focus on industry-relevant skills, practical training, and personality development, we equip students with the knowledge and confidence required to excel in airlines, airports, and global hospitality sectors. Our experienced faculty, modern training approach, and dedicated placement support ensure that every student is prepared to step into a successful and rewarding career.
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
